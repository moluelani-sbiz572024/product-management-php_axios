<?php
require_once dirname(__FILE__).'/../conf/config.php';

$sql = 'DELETE FROM products WHERE id = :id';

try {
  $pdo = new PDO($dsn, $user, $password);
  $stmt = $pdo->prepare($sql);
  $stmt->bindValue(':id', $_GET['id'], PDO::PARAM_INT);
  $stmt->execute();

  echo "商品を{$stmt->rowCount()}件削除しました。";

} catch (PDOException $ex) {
  echo $ex->getMessage();
}