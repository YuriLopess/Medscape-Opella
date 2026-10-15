<?php
// Instalador avulso para o servidor da Medscape, onde o banco só é acessível de dentro.
// NÃO faz parte do build: envie por FTP para a raiz do site com um nome aleatório
// (ex.: instalar-<aleatorio>.php) e o schema.sql para server/, depois:
//   1. abra uma vez          -> só diagnóstico (versão do PHP, qual host/banco funciona)
//   2. abra com ?criar=1     -> roda server/schema.sql, depois apaga a cópia do SQL e a si mesmo.
declare(strict_types=1);

require __DIR__ . '/server/bootstrap.php';

header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-store');

$c = app_config();
echo 'PHP ' . PHP_VERSION . "\n";
echo 'pdo_mysql: ' . (extension_loaded('pdo_mysql') ? 'sim' : 'NAO') . "\n";
echo 'mod_rewrite: ' . (function_exists('apache_get_modules')
    ? (in_array('mod_rewrite', apache_get_modules(), true) ? 'sim' : 'NAO')
    : 'nao da para saber daqui (PHP-FPM)') . "\n\n";

$working = null;
foreach (array_unique([$c['db_host'], 'localhost', '127.0.0.1']) as $host) {
    try {
        $probe = new PDO("mysql:host=$host;port={$c['db_port']};charset=utf8mb4", $c['db_user'], $c['db_pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_TIMEOUT => 5,
        ]);
        $dbs = $probe->query('SHOW DATABASES')->fetchAll(PDO::FETCH_COLUMN);
        echo "host $host: conecta; bancos visiveis: " . implode(', ', $dbs) . "\n";
        $working = $working ?? $host;
    } catch (Throwable $e) {
        echo "host $host: falhou (" . $e->getMessage() . ")\n";
    }
}
if ($working === null) {
    exit("\nNenhum host funcionou: confira usuario e senha do banco no config.local.php.\n");
}
if ($working !== $c['db_host']) {
    echo "\nATENCAO: ajuste db_host no config.local.php para '$working'.\n";
}

try {
    $pdo = db();
    echo "\nbanco configurado ({$c['db_name']} em {$c['db_host']}): ok\n";
} catch (Throwable $e) {
    exit("\nbanco configurado ({$c['db_name']} em {$c['db_host']}): falhou (" . $e->getMessage() . ")\n");
}
echo 'tabelas: ' . (implode(', ', $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN)) ?: '(nenhuma)') . "\n";

if (($_GET['criar'] ?? '') !== '1') {
    exit("\nSo diagnostico. Abra com ?criar=1 para criar as tabelas.\n");
}

$leftovers = [];
$path = __DIR__ . '/server/schema.sql';
if (!is_file($path)) {
    exit("\nschema.sql nao encontrado em server/.\n");
}
$sql = (string) preg_replace('/^\s*--.*$/m', '', (string) file_get_contents($path));
foreach (array_filter(array_map('trim', explode(';', $sql))) as $statement) {
    $pdo->exec($statement);
}
echo "schema.sql: executado\n";
$leftovers[] = $path;

echo 'tabelas agora: ' . implode(', ', $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN)) . "\n";

// No servidor da Medscape o usuário do Apache não consegue apagar arquivos enviados por FTP,
// então o instalador avisa quando não conseguiu.
$leftovers[] = __FILE__;
$kept = array_filter($leftovers, fn ($f) => !@unlink($f));
echo $kept
    ? "\nAPAGUE POR FTP (o servidor nao deixou apagar): " . implode(', ', array_map('basename', $kept)) . "\n"
    : "\nInstalador e copia do SQL apagados.\n";
