<?php
require_once dirname(__FILE__).'/../conf/config.php';

$upd_id = $_GET['upd_id'];
$sql = 'SELECT * FROM products WHERE id = :id';

try {
  $pdo = new PDO($dsn, $user, $password);
  $stmt = $pdo->prepare($sql);
  $stmt->bindValue(':id', $upd_id, PDO::PARAM_INT);
  $stmt->execute();

  $product = $stmt->fetch(PDO::FETCH_ASSOC);

  echo json_encode($product);

} catch (PDOException $ex) {
  echo $ex->getMessage();
}