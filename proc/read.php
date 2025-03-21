<?php
require_once '../conf/config.php';

$order = isset($_GET['order']) ? $_GET['order'] : NULL;
$keyword = isset($_GET['keyword']) ? $_GET['keyword'] : NULL;

$sql =  ($order === 'desc') ?
  'SELECT * FROM products WHERE product_name LIKE :keyword ORDER BY updated_at DESC' :
  'SELECT * FROM products WHERE product_name LIKE :keyword ORDER BY updated_at ASC' ;

try {
  $pdo = new PDO($dsn, $user, $password);
  $stmt = $pdo->prepare($sql);
  $match = "%{$keyword}%";
  $stmt->bindValue(':keyword', $match, PDO::PARAM_STR);
  $stmt->execute();
  
  $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($products);

} catch (PDOException $ex) {
  echo $ex->getMessage();
}