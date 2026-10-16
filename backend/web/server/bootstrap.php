<?php
// Configuração compartilhada por todo ponto de entrada PHP.
declare(strict_types=1);

ini_set('display_errors', '0');
date_default_timezone_set('America/Sao_Paulo');

const SESSION_COOKIE = 'opella_session';

const UFS = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

function app_config(): array
{
    static $config = null;
    if ($config === null) {
        $config = require __DIR__ . '/config.php';
    }
    return $config;
}

function db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $c = app_config();
        $dsn = "mysql:host={$c['db_host']};port={$c['db_port']};dbname={$c['db_name']};charset=utf8mb4";
        $pdo = new PDO($dsn, $c['db_user'], $c['db_pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        $pdo->prepare('SET time_zone = ?')->execute([$c['db_timezone']]);
    }
    return $pdo;
}

function is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
}

/* ── Sessões ── */

/** Retorna a sessão logada (usuario_id) ou null. usuario_id é null para quem entrou pelo link sem login. */
function current_session(): ?array
{
    $token = $_COOKIE[SESSION_COOKIE] ?? '';
    if (!is_string($token) || !preg_match('/^[a-f0-9]{64}$/', $token)) {
        return null;
    }
    $stmt = db()->prepare('SELECT usuario_id FROM sessoes WHERE token_hash = ? AND expira_em > NOW()');
    $stmt->execute([hash('sha256', $token)]);
    $row = $stmt->fetch();
    return $row ?: null;
}

/** Igual a current_session(), mas trata falha de banco como "não logado". */
function current_session_or_null(): ?array
{
    try {
        return current_session();
    } catch (Throwable $e) {
        error_log('[opella] session check failed: ' . $e->getMessage());
        return null;
    }
}

/** $usuarioId é null na sessão anônima do link sem login; $days padrão: session_days. */
function start_session(?int $usuarioId, ?int $days = null): void
{
    $days = $days ?? (int) app_config()['session_days'];
    $token = bin2hex(random_bytes(32));

    $pdo = db();
    $pdo->exec('DELETE FROM sessoes WHERE expira_em < NOW()');
    $pdo->prepare('INSERT INTO sessoes (usuario_id, token_hash, expira_em) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY))')
        ->execute([$usuarioId, hash('sha256', $token), $days]);

    setcookie(SESSION_COOKIE, $token, [
        'expires' => time() + $days * 86400,
        'path' => '/',
        'secure' => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function end_session(): void
{
    $token = $_COOKIE[SESSION_COOKIE] ?? '';
    if (is_string($token) && preg_match('/^[a-f0-9]{64}$/', $token)) {
        db()->prepare('DELETE FROM sessoes WHERE token_hash = ?')->execute([hash('sha256', $token)]);
    }
    setcookie(SESSION_COOKIE, '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

function log_access(?int $usuarioId, string $evento): void
{
    db()->prepare('INSERT INTO acessos (usuario_id, evento) VALUES (?, ?)')->execute([$usuarioId, $evento]);
}

/**
 * True quando $code é um dos códigos do link sem login (banner_codes). Códigos com menos de 16
 * caracteres são ignorados, então uma configuração vazia ou descuidada não abre o site.
 */
function banner_code_valid($code): bool
{
    if (!is_string($code) || strlen($code) < 16) {
        return false;
    }
    foreach ((array) app_config()['banner_codes'] as $valid) {
        if (is_string($valid) && strlen($valid) >= 16 && hash_equals($valid, $code)) {
            return true;
        }
    }
    return false;
}

/* ── Auxiliares da API JSON ── */

function json_response(int $status, array $body): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function json_error(int $status, string $error, string $message): void
{
    json_response($status, ['ok' => false, 'error' => $error, 'message' => $message]);
}

/** Maior corpo de requisição aceito pela API; um cadastro fica bem abaixo de 1 KB. */
const MAX_BODY_BYTES = 10240;

/**
 * Lê um corpo POST em JSON. Exigir o content-type JSON também bloqueia POST de formulário
 * entre sites: um navegador só consegue mandar isso entre origens depois de um preflight CORS
 * que nunca liberamos. Como segunda camada, uma requisição cujo Origin aponta pra outro site
 * é recusada.
 */
function read_json_post(): array
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        json_error(405, 'metodo', 'Método não permitido.');
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && strcasecmp((string) parse_url($origin, PHP_URL_HOST) . port_suffix($origin), (string) ($_SERVER['HTTP_HOST'] ?? '')) !== 0) {
        json_error(403, 'origem', 'Requisição não permitida.');
    }
    if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
        json_error(415, 'formato', 'Formato de envio inválido.');
    }
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
        json_error(413, 'tamanho', 'Envio grande demais.');
    }
    $body = (string) file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
    if (strlen($body) > MAX_BODY_BYTES) {
        json_error(413, 'tamanho', 'Envio grande demais.');
    }
    $data = json_decode($body, true);
    if (!is_array($data)) {
        json_error(400, 'formato', 'Formato de envio inválido.');
    }
    return $data;
}

/** ":porta" quando a URL do Origin tem porta explícita, pra comparar com Host ("localhost:5173"). */
function port_suffix(string $url): string
{
    $port = parse_url($url, PHP_URL_PORT);
    return $port ? ':' . $port : '';
}

/**
 * Lista gerada pelo build a partir dos mesmos dados da tela (ver vite.config.ts).
 * Se estiver faltando, a checagem é pulada e registrada no log, em vez de bloquear todo cadastro.
 */
function shared_list(string $file): ?array
{
    static $cache = [];
    if (!array_key_exists($file, $cache)) {
        $raw = @file_get_contents(__DIR__ . '/' . $file);
        $list = $raw === false ? null : json_decode($raw, true);
        if (!is_array($list)) {
            error_log("[opella] $file ausente ou inválido; checagem pulada");
            $list = null;
        }
        $cache[$file] = $list;
    }
    return $cache[$file];
}

function valid_specialty(string $especialidade): bool
{
    $list = shared_list('especialidades.json');
    return $list === null ? valid_text($especialidade, 120) : in_array($especialidade, $list, true);
}

/**
 * Óbvia demais: está na lista de senhas comuns, ou contém a parte do e-mail antes do @
 * (quando tem 4+ caracteres). Espelha passwordTooObvious() em CadastroPage.tsx.
 */
function password_too_obvious(string $senha, string $email): bool
{
    $lower = mb_strtolower_safe($senha);
    $common = shared_list('senhas-comuns.json') ?? [];
    if (in_array($lower, $common, true)) {
        return true;
    }
    $local = strtolower((string) strstr($email, '@', true));
    return strlen($local) >= 4 && strpos($lower, $local) !== false;
}

function mb_strtolower_safe(string $s): string
{
    return function_exists('mb_strtolower') ? mb_strtolower($s, 'UTF-8') : strtolower($s);
}

/** Roda um handler de API, transformando falhas inesperadas num 500 genérico. */
function run_api(callable $handler): void
{
    try {
        $handler();
    } catch (Throwable $e) {
        error_log('[opella] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
        json_error(500, 'servidor', 'Não foi possível concluir agora. Tente novamente em instantes.');
    }
}

/* ── Validação de campos (espelha as regras em CadastroPage.tsx) ── */

function str_field(array $data, string $key): string
{
    $value = $data[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function valid_text(string $value, int $max): bool
{
    return preg_match('/^.{1,' . $max . '}$/u', $value) === 1;
}

/**
 * Nome de pessoa: letras (com acentos), espaço, hífen, apóstrofo ou ponto — assim
 * "Ana-Maria", "D'Ávila" e "Jr." passam — com pelo menos 2 letras e até 100 caracteres.
 * Espelha validateName() em CadastroPage.tsx.
 */
function valid_name(string $name): bool
{
    return preg_match("/^[\\p{L}\\p{M}][\\p{L}\\p{M} .'’-]{0,99}$/u", $name) === 1
        && preg_match_all('/\p{L}/u', $name) >= 2;
}

function valid_email(string $email): bool
{
    return strlen($email) <= 190 && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function valid_crm(string $crm): bool
{
    return preg_match('/^\d{4,8}$/', $crm) === 1;
}

/**
 * Não há consulta oficial de CRM, então isso só pega números digitados só pra passar pelo
 * campo: tudo zero, um dígito repetido (111111) ou sequência (123456, 987654). Qualquer outro
 * valor é aceito como "nao_verificado". Espelha crmLooksMadeUp() em CadastroPage.tsx.
 */
function crm_looks_made_up(string $crm): bool
{
    if (ltrim($crm, '0') === '' || preg_match('/^(\d)\1+$/', $crm) === 1) {
        return true;
    }
    $up = true;
    $down = true;
    for ($i = 1, $n = strlen($crm); $i < $n; $i++) {
        $step = (int) $crm[$i] - (int) $crm[$i - 1];
        $up = $up && $step === 1;
        $down = $down && $step === -1;
    }
    return $up || $down;
}

/**
 * 8 a 200 caracteres com pelo menos uma letra e um dígito; o teto evita que um corpo
 * enorme deixe o hash caro. Espelha validatePassword() em CadastroPage.tsx.
 */
function valid_password($senha): bool
{
    return is_string($senha)
        && preg_match('/^.{8,200}$/us', $senha) === 1
        && preg_match('/\p{L}/u', $senha) === 1
        && preg_match('/\d/', $senha) === 1;
}
