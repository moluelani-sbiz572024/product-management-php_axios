<?php
require_once dirname(__FILE__).'/../conf/config.php';

// 商品情報の登録
$sql = '
  INSERT INTO products
    (product_code, product_name, price, stock_quantity, vendor_code)
  VALUES
    (:product_code, :product_name, :price, :stock_quantity, :vendor_code)
';

try {
  $pdo = new PDO($dsn, $user, $password);
  $stmt = $pdo->prepare($sql);
  $stmt->bindValue(':product_code',   $_GET['pcode'], PDO::PARAM_INT);
  $stmt->bindValue(':product_name',   $_GET['pname'], PDO::PARAM_STR);
  $stmt->bindValue(':price',          $_GET['price'], PDO::PARAM_INT);
  $stmt->bindValue(':stock_quantity', $_GET['stock'], PDO::PARAM_INT);
  $stmt->bindValue(':vendor_code',    $_GET['vcode'], PDO::PARAM_INT);
  $stmt->execute();

  echo "商品を{$stmt->rowCount()}件登録しました。";

} catch (PDOException $ex) {
  echo $ex->getMessage();
}
