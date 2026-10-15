<?php
declare(strict_types=1);

require __DIR__ . '/../server/bootstrap.php';

run_api(function (): void {
    read_json_post();
    end_session();
    json_response(200, ['ok' => true]);
});
