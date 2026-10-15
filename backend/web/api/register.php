<?php
declare(strict_types=1);

require __DIR__ . '/../server/bootstrap.php';

/** True quando esse IP esgotou as tentativas de cadastro dentro da janela. */
function register_limited(string $ip): bool
{
    $c = app_config();
    $stmt = db()->prepare('SELECT COUNT(*) FROM tentativas_cadastro WHERE ip = ? AND criado_em > DATE_SUB(NOW(), INTERVAL ? MINUTE)');
    $stmt->execute([$ip, (int) $c['register_window_minutes']]);
    return (int) $stmt->fetchColumn() >= (int) $c['register_max_per_ip'];
}

function record_register_attempt(string $ip): void
{
    $pdo = db();
    $pdo->exec('DELETE FROM tentativas_cadastro WHERE criado_em < DATE_SUB(NOW(), INTERVAL 1 DAY)');
    $pdo->prepare('INSERT INTO tentativas_cadastro (ip) VALUES (?)')->execute([$ip]);
}

run_api(function (): void {
    $data = read_json_post();

    // Toda tentativa conta, válida ou não, pra um bot não conseguir inundar contas nem
    // sondar quais e-mails estão cadastrados.
    $ip = substr((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
    if (register_limited($ip)) {
        json_error(429, 'muitas_tentativas', 'Muitas tentativas de cadastro a partir desta conexão. Tente novamente mais tarde.');
    }
    record_register_attempt($ip);

    // Honeypot: campo escondido de pessoas que bots preenchem. Recusa sem dizer o motivo.
    if (str_field($data, 'site') !== '') {
        json_error(422, 'dados_invalidos', 'Não foi possível concluir o cadastro.');
    }

    $nome = str_field($data, 'nome');
    $sobrenome = str_field($data, 'sobrenome');
    $email = strtolower(str_field($data, 'email'));
    // Não é "trimado": espaços fazem parte da senha.
    $senha = $data['senha'] ?? null;
    $crm = str_field($data, 'crm');
    $uf = strtoupper(str_field($data, 'uf'));
    $especialidade = str_field($data, 'especialidade');

    // Uma mensagem por campo (mesmo texto da tela), pra página apontar o que está errado.
    $fields = [];
    if (!valid_name($nome)) {
        $fields['nome'] = 'Use apenas letras no nome (mínimo de 2).';
    }
    if (!valid_name($sobrenome)) {
        $fields['sobrenome'] = 'Use apenas letras no sobrenome (mínimo de 2).';
    }
    if (!valid_email($email)) {
        $fields['email'] = 'Informe um e-mail válido.';
    }
    if (!valid_password($senha)) {
        $fields['senha'] = 'A senha deve ter de 8 a 200 caracteres, com letras e números.';
    } elseif (password_too_obvious($senha, $email)) {
        $fields['senha'] = 'Essa senha é fácil de adivinhar. Escolha outra.';
    }
    if (!valid_crm($crm)) {
        $fields['crm'] = 'O CRM deve ter entre 4 e 8 dígitos.';
    } elseif (crm_looks_made_up($crm)) {
        $fields['crm'] = 'Confira o número do CRM.';
    }
    if (!in_array($uf, UFS, true)) {
        $fields['uf'] = 'Selecione o estado (UF).';
    }
    if (!valid_specialty($especialidade)) {
        $fields['especialidade'] = 'Selecione a especialidade.';
    }
    if (($data['declaracao'] ?? false) !== true) {
        $fields['declaracao'] = 'É necessário confirmar a declaração para continuar.';
    }
    if ($fields) {
        json_response(422, [
            'ok' => false,
            'error' => 'dados_invalidos',
            'message' => 'Revise os campos destacados.',
            'fields' => $fields,
        ]);
    }

    $pdo = db();
    $stmt = $pdo->prepare('SELECT email = ? AS mesmo_email FROM usuarios WHERE email = ? OR (crm = ? AND uf = ?) LIMIT 1');
    $stmt->execute([$email, $email, $crm, $uf]);
    $existing = $stmt->fetch();
    if ($existing) {
        json_error(409, 'ja_cadastrado', $existing['mesmo_email']
            ? 'Este e-mail já está cadastrado. Entre com seu e-mail e senha.'
            : 'Este CRM já está cadastrado. Entre com o e-mail e a senha usados no cadastro.');
    }

    // Não há consulta oficial de CRM: crm_status mantém o padrão do banco, 'nao_verificado'.
    try {
        $pdo->prepare(
            'INSERT INTO usuarios (nome, sobrenome, email, senha_hash, crm, uf, especialidade, declaracao_aceita_em)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW())'
        )->execute([$nome, $sobrenome, $email, password_hash($senha, PASSWORD_DEFAULT), $crm, $uf, $especialidade]);
    } catch (PDOException $e) {
        // Perdeu uma corrida contra um cadastro idêntico.
        if ($e->getCode() === '23000') {
            json_error(409, 'ja_cadastrado', 'Este cadastro já existe. Entre com seu e-mail e senha.');
        }
        throw $e;
    }

    $usuarioId = (int) $pdo->lastInsertId();
    start_session($usuarioId);
    log_access($usuarioId, 'cadastro');

    json_response(201, ['ok' => true]);
});
