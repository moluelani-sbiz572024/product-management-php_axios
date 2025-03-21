<!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
  <!-- Google Fonts (Noto Sans JP) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap" rel="stylesheet">
  <!--  -->
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body>
  <header>
    <nav>
      <a href="./"></a>
      <div class="brand"></div>
      <div class="nav-mesg"></div>
    </nav>
  </header>

  <main>
    <article class="registration">
      <div>
        <a href="read.html" class="btn">&lt; 戻る</a>
      </div>
      <div class="registration-form">
        <div>
          <label for="product_code">商品コード</label>
          <input type="number" id="product_code" name="product_code" min="0" max="100000000" autofocus required>
          <label for="product_name">商品名</label>
          <input type="text" id="product_name" name="product_name" maxlength="50" required>
          <label for="price">単価</label>
          <input type="number" id="price" name="price" min="0" max="100000000" required>
          <label for="stock_quantity">在庫数</label>
          <input type="number" id="stock_quantity" name="stock_quantity" min="0" max="100000000" required>
          <label for="vendor_code">仕入先コード</label>
          <select id="vendor_code" name="vendor_code" required>
            <option disabled selected value>選択して下さい</option>
          </select>
          <button type="button" class="submit-btn">更新</button>
        </div>
      </div>
    </article>
  </main>

  <footer>
    <p class="copyright"></p>
  </footer>

  <script src="js/comp.js"></script>
  <script src="js/module.js"></script>
  <script src="js/app/edit.js"></script>
  <script>
  window.addEventListener('load', () => {
    const app = productUpdateApp;
    
    //
    app.initialize();
    
    //
    app.setupVendorCodeList(2000);

    //
    setTimeout(() => {
      const id = <?= $id = $_GET['id']; ?>;
      app.setupEditProductInfo(id, 1000);
    }, 2000);
  });

  //
  update_btn.addEventListener('click', (evt) => {
    app.updateProductInfo(
      <?= $id = $_GET['id']; ?>, '商品情報の更新を行います ...', 3000
    );
  });
  </script>
</body>
</html>