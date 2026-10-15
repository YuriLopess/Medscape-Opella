<?php
declare(strict_types=1);

require __DIR__ . '/../server/bootstrap.php';

// Verificado mesmo quando o e-mail não existe, pra que os dois tipos de falha levem o
// mesmo tempo e o formulário não sirva pra descobrir quais e-mails estão cadastrados.
const DUMMY_HASH = '$2y$10$Rc3QlSCsfRuMmAoM/CztOOppCLwOoyxHVaviMa5tdFnDon7s04oYq';

/** True quando esse e-mail ou IP esgotou as tentativas dentro da janela de bloqueio. */
function login_locked(string $email, string $ip): bool
{
    $c = app_config();
    $stmt = db()->prepare(
        'SELECT
           SUM(email = ?) AS por_email,
           SUM(ip = ?) AS por_ip
         FROM tentativas_login
         WHERE (email = ? OR ip = ?) AND criado_em > DATE_SUB(NOW(), INTERVAL ? MINUTE)'
    );
    $stmt->execute([$email, $ip, $email, $ip, (int) $c['login_lockout_minutes']]);
    $row = $stmt->fetch();
    return (int) $row['por_email'] >= (int) $c['login_max_failures_per_email']
        || (int) $row['por_ip'] >= (int) $c['login_max_failures_per_ip'];
}

function record_login_failure(string $email, string $ip): void
{
    $pdo = db();
    $pdo->exec('DELETE FROM tentativas_login WHERE criado_em < DATE_SUB(NOW(), INTERVAL 1 DAY)');
    $pdo->prepare('INSERT INTO tentativas_login (email, ip) VALUES (?, ?)')->execute([$email, $ip]);
}

run_api(function (): void {
    $data = read_json_post();

    // Limitado ao tamanho da coluna, pra um valor gigante não quebrar o log de tentativas.
    $email = substr(strtolower(str_field($data, 'email')), 0, 190);
    $senha = $data['senha'] ?? null;
    $ip = substr((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);

    if (login_locked($email, $ip)) {
        $minutes = (int) app_config()['login_lockout_minutes'];
        json_error(429, 'muitas_tentativas', "Muitas tentativas de acesso. Aguarde $minutes minutos e tente novamente.");
    }

    $usuario = null;
    if (valid_email($email) && is_string($senha) && $senha !== '') {
        $stmt = db()->prepare('SELECT id, senha_hash FROM usuarios WHERE email = ?');
        $stmt->execute([$email]);
        $usuario = $stmt->fetch() ?: null;
    }

    $ok = password_verify(is_string($senha) ? $senha : '', $usuario ? $usuario['senha_hash'] : DUMMY_HASH);
    if (!$usuario || !$ok) {
        record_login_failure($email, $ip);
        json_error(401, 'nao_encontrado', 'E-mail ou senha incorretos.');
    }

    db()->prepare('DELETE FROM tentativas_login WHERE email = ?')->execute([$email]);

    $usuarioId = (int) $usuario['id'];
    start_session($usuarioId);
    log_access($usuarioId, 'login');

    json_response(200, ['ok' => true]);
});
