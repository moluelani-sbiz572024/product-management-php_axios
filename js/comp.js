'use strict';

/**
 * 商品管理アプリ・コンポーネント
 */
const prodComp = {
  // 商品管理アプリ・画面タイトル
  title: {
    top:    '商品管理アプリ（SPA版）',
    read:   '商品一覧',
    create: '商品登録',
    update: '商品編集',
  },

  subject:  '『PHPとデータベースを連携しよう』成果物',
  nav_mesg: document.querySelector('div.nav-mesg'),
  keyword:  '',
  order:    'asc',

  // 商品管理アプリ・機能データ
  action: {
    read:   'proc/read.php',
    create: 'proc/create.php',
    find:   'proc/find.php',
    update: 'proc/update.php',
    delete: 'proc/delete.php',
    vendor: 'proc/vendors.php',
  },

  // 商品管理アプリ・商品一覧
  cell: {
    prodCode:      (value) => { return `<td>${value}</td>` },
    prodName:      (value) => { return `<td>${value}</td>` },
    price:         (value) => { return `<td>${value}</td>` },
    stockQuantity: (value) => { return `<td>${value}</td>` },
    vendorCode:    (value) => { return `<td>${value}</td>` },
    edit: (upd_id) => {
      const _upd_img = `<img src="images/edit.png" alt="編集" class="edit-icon">`;
      const _update = `<a href="edit.php?id=${upd_id}" class="edit-update">${_upd_img}</a>`;
      return `<td>${_update}</td>`;
    },
    remove: (del_id) => {
      const _del_img = 
        `<img src="images/delete.png" alt="削除" class="delete-icon" onclick="productReadApp.onRemove(${del_id})">`;
      const _delete = `<span data="${del_id}" class="edit-delete">${_del_img}</span>`;
      return `<td>${_delete}</td>`;
    },
  },

  // 商品管理アプリ・商品UIデータ
  form: {
    prodCode:      0,
    prodName:      '',
    price:         0,
    stockQuantity: 0,
    vendorCode:    0,
    reset() {
      this.prodCode = 0;
      this.prodName = '';
      this.price = 0;
      this.stockQuantity = 0;
      this.vendorCode = 0;
      this.prodCodeUI.value = '';
      this.prodNameUI.value = '';
      this.priceUI.value = '';
      this.stockQuantityUI.value = '';
      this.vendorCodeUI.value = '';
    },
    prodCodeUI:      document.querySelector('input#product_code'),
    prodNameUI:      document.querySelector('input#product_name'),
    priceUI:         document.querySelector('input#price'),
    stockQuantityUI: document.querySelector('input#stock_quantity'),
    vendorCodeUI:    document.querySelector('select#vendor_code'),
  },

  // 商品管理アプリ・実行結果
  result: {
    code:   -1,
    status: null,
    data:   null,
  },

  /**
   * フッター情報を表示する
   * @param {*} title フッター表示テキスト（アプリ名）
   * @returns フッターに表示するテキスト
   */
  getFooter(title) {
    return `&copy; ${title} All rights reserved.`;
  }
}