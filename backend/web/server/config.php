<?php
// Os padrões vêm de variáveis de ambiente (Docker local). Em produção, crie
// server/config.local.php (ao lado deste arquivo) retornando um array só com as chaves que mudam:
//   <?php return ['db_host' => 'localhost', 'db_pass' => '...'];

$config = [
    'db_host' => getenv('DB_HOST') ?: 'localhost',
    'db_port' => getenv('DB_PORT') ?: '3306',
    'db_name' => getenv('DB_NAME') ?: 'opella_hub',
    'db_user' => getenv('DB_USER') ?: 'opella_hub',
    'db_pass' => getenv('DB_PASS') ?: '',
    // Brasil não tem mais horário de verão desde 2019, então um offset fixo mantém os
    // horários no fuso de Brasília.
    'db_timezone' => '-03:00',
    'session_days' => 30,
    // Logins errados permitidos dentro da janela de bloqueio antes de novas tentativas serem recusadas.
    'login_max_failures_per_email' => 5,
    'login_max_failures_per_ip' => 20,
    'login_lockout_minutes' => 15,
    // Tentativas de cadastro (válidas ou não) permitidas por IP por janela.
    'register_max_per_ip' => 20,
    'register_window_minutes' => 60,
];

$local = __DIR__ . '/config.local.php';
if (is_file($local)) {
    $config = array_merge($config, require $local);
}

return $config;
