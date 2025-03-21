<?php
require_once dirname(__FILE__).'/../conf/config.php';

//
$sql = '
  UPDATE products SET
    product_code = :pcode,
    product_name = :pname,
    price = :price,
    stock_quantity = :stock,
    vendor_code = :vcode
  WHERE id = :id
';

try {
  $pdo = new PDO($dsn, $user, $password);
  $stmt = $pdo->prepare($sql);
  $stmt->bindValue(':pcode', $_GET['pcode'],  PDO::PARAM_INT);
  $stmt->bindValue(':pname', $_GET['pname'],  PDO::PARAM_STR);
  $stmt->bindValue(':price', $_GET['price'],  PDO::PARAM_INT);
  $stmt->bindValue(':stock', $_GET['stock'],  PDO::PARAM_INT);
  $stmt->bindValue(':vcode', $_GET['vcode'],  PDO::PARAM_INT);
  $stmt->bindValue(':id',    $_GET['upd_id'], PDO::PARAM_INT);
  $stmt->execute();

  echo "商品を{$stmt->rowCount()}件更新しました。";

} catch (PDOException $ex) {
  echo $ex->getMessage();
}