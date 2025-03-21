'use strict';

const brand = document.querySelector('nav>div.brand');
const vcode_menu = document.querySelector('select#vendor_code');
const entry_btn = document.querySelector('a.submit-btn');
const UI = {
  productCode:   prodComp.form.prodCodeUI,
  productName:   prodComp.form.prodNameUI,
  productPrice:  prodComp.form.priceUI,
  stockQuantity: prodComp.form.stockQuantityUI,
  vendorCode:    prodComp.form.vendorCodeUI,
};

const productEntryApp = {

  _buildVendorCodeList(result, text) {
    if (result.status) {
      result.data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item;
        option.text = item;
        vcode_menu.appendChild(option);
      });
      prodRender.renderMessage(text);
    } else {
      prodRender.err.readVendorsMessage();
    }
  },

  _renderEntry(result) {
    if (result.status) {
      prodComp.form.reset();
      prodRender.renderMessage(result.data);
    } else {
      prodRender.err.entryProductsMessage();
    }
  },

  initialize() {
    prodRender.initialize();
    brand.textContent = prodComp.title.create;
  },

  setupVendorCodeList(delay) {
    prodService.doGet(prodComp.action.vendor, prodComp.result);
    setTimeout(this._buildVendorCodeList, delay, prodComp.result, '商品登録できます。');
  },

  bindProductCode(value) {
    prodComp.form.prodCode = Number(value);
  },

  bindProductName(value) {
    prodComp.form.prodName = value;
  },

  bindProductPrice(value) {
    prodComp.form.price = Number(value);
  },

  bindStockQuantity(value) {
    prodComp.form.stockQuantity = Number(value);
  },

  bindVendorCode(value) {
    prodComp.form.vendorCode = Number(value);
  },

  entryProductInfo(text, delay) {
    const param = {
      pcode: prodComp.form.prodCode,
      pname: prodComp.form.prodName,
      price: prodComp.form.price,
      stock: prodComp.form.stockQuantity,
      vcode: prodComp.form.vendorCode,
    };
    prodRender.renderMessage(text);
    prodService.doGet(prodComp.action.create, prodComp.result, param);
    setTimeout(this._renderEntry, delay, prodComp.result);
  }
};