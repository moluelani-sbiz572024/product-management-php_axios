<?php
$db_name = 'php_db';
$db_host = '192.168.0.46';

$dsn = sprintf(
    'mysql:dbname=%s;host=%s;charset=utf8mb4',
    $db_name, $db_host
);
$user = 'samurai';
$password = 'Passw0rd';
