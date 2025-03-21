'use strict';

const brand = document.querySelector('nav>div.brand');
const vcode_menu = document.querySelector('select#vendor_code');
const update_btn = document.querySelector('button.submit-btn');
const UI = {
  productCode:   prodComp.form.prodCodeUI,
  productName:   prodComp.form.prodNameUI,
  productPrice:  prodComp.form.priceUI,
  stockQuantity: prodComp.form.stockQuantityUI,
  vendorCode:    prodComp.form.vendorCodeUI,
};

const productUpdateApp = {

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

  _renderUpdate(result) {
    if (result.status) {
      prodComp.form.reset();
      prodRender.renderMessage(result.data);
    } else {
      prodRender.err.updateProductMessage();
    }
  },

  initialize() {
    prodRender.initialize();
    brand.textContent = prodComp.title.update;
  },

  setupVendorCodeList(delay) {
    prodService.doGet(prodComp.action.vendor, prodComp.result);
    setTimeout(this._buildVendorCodeList, delay, prodComp.result, '商品編集できます。');
  },

  setupEditProductInfo(updId, delay) {
    const param = {
      is_read: true,
      upd_id: updId,
    };
    prodService.doGet(prodComp.action.find, prodComp.result, param);
    setTimeout(() => {
      if (prodComp.result.status) {
        prodComp.form.prodCodeUI.value = prodComp.result.data.product_code;
        prodComp.form.prodNameUI.value = prodComp.result.data.product_name;
        prodComp.form.priceUI.value = prodComp.result.data.price;
        prodComp.form.stockQuantityUI.value = prodComp.result.data.stock_quantity;
        const _vcode = prodComp.result.data.vendor_code;
        const _options = prodComp.form.vendorCodeUI.options;
        for (let ix = 0; ix < _options.length; ix++) {
          if (_options[ix].value == _vcode) {
            _options[ix].selected = true;
            break;
          }
        }
      } else {
        prodRender.err.readProductsMessage();
      }
    }, delay);
  },

  updateProductInfo(id, text, delay) {
    const param = {
      upd_id: Number(id),
      pcode: Number(prodComp.form.prodCodeUI.value),
      pname: prodComp.form.prodNameUI.value,
      price: Number(prodComp.form.priceUI.value),
      stock: Number(prodComp.form.stockQuantityUI.value),
      vcode: Number(prodComp.form.vendorCodeUI.value),
    };
    console.log(param);
    prodRender.renderMessage(text);

    prodService.doGet(prodComp.action.update, prodComp.result, param);
    setTimeout(() => {
      if (prodComp.result.status) {
        prodComp.form.reset();
        prodRender.renderMessage(prodComp.result.data);
      } else {
        prodRender.err.modifyProductsMessage();
      }
    }, delay);
  }
};