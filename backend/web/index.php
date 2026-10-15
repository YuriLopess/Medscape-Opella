<?php
// Front controller de toda rota do site (o .htaccess gerado pelo build manda tudo pra cá,
// exceto /api/*, /private/* e arquivos estáticos): com sessão válida entrega o app; sem
// sessão, entrega a tela de cadastro/login — na própria URL pedida, sem redirecionar.
declare(strict_types=1);

require __DIR__ . '/server/bootstrap.php';

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-store');

$session = current_session_or_null();

if ($session === null) {
    readfile(__DIR__ . '/index.html');
    exit;
}

try {
    log_access((int) $session['usuario_id'], 'visita');
} catch (Throwable $e) {
    error_log('[opella] visit log failed: ' . $e->getMessage());
}

readfile(__DIR__ . '/home.html');
