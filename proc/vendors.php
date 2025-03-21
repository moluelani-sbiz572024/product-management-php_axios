<?php
require_once '../conf/config.php';

// 仕入先コードの取得
$sql = 'SELECT vendor_code FROM vendors';

try {
  $pdo = new PDO($dsn, $user, $password);
  $stmt = $pdo->query($sql);
  $codes = $stmt->fetchAll(PDO::FETCH_COLUMN);

  echo json_encode($codes);

} catch (PDOException $ex) {
  exit($ex->getMessage());
}