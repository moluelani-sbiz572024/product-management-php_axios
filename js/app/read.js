'use strict';

const brand = document.querySelector('nav>div.brand');
const resp  = document.querySelector('tbody.resp-products-table');
const desc_arrow = document.querySelector('img.sort-desc');
const asc_arrow = document.querySelector('img.sort-asc');
const search_box = document.querySelector('input.search-box');

const productReadApp = {
  
  _renderTable(result, resp) {
    if (result.status) {
      prodRender.respTableItem(result.data, resp);
      prodRender.okey.readProductsMessage();
    } else {
      prodRender.err.readProductsMessage();
    }
  },

  initialize() {
    prodRender.initialize();
    brand.textContent = prodComp.title.read;
    resp.innerHTML = '';
  },

  readProductInfo(text, delay, param = null) {
    prodRender.renderMessage(text);

    prodService.doGet(prodComp.action.read, prodComp.result, param);
    setTimeout(this._renderTable, 2000, prodComp.result, resp);

    prodRender.clearMessage(delay);
  },

  bindSearchBox(value) {
    prodComp.keyword = value;
  },

  filterProductInfo(key, text, delay) {
    if (key === 'Enter') {
      const param = {
        keyword: prodComp.keyword,
        order: prodComp.order,
      };
      resp.innerHTML = '';
      this.readProductInfo(text, delay, param);
    }
  },

  descendingOrder(text, delay) {
    prodComp.order = 'desc';
    const param = {
      keyword: prodComp.keyword,
      order: prodComp.order,
    };
    resp.innerHTML = '';
    this.readProductInfo(text, delay, param);
  },

  ascendingOrder(text, delay) {
    prodComp.order = 'asc';
    const param = {
      keyword: prodComp.keyword,
      order: prodComp.order,
    };
    resp.innerHTML = '';
    this.readProductInfo(text, delay, param);
  },

  onRemove(del_id) {
    const param = {
      id: del_id
    };
    prodRender.renderMessage('商品情報の削除を行います ...');

    prodService.doGet(prodComp.action.delete, prodComp.result, param);
    setTimeout(() => {
      if (prodComp.result.status) {
        prodRender.renderMessage(prodComp.result.data);
        setTimeout(() => {
          location.href = 'read.html';
        }, 2000);
      } else {
        prodRender.err.removeProductsMessage();
      }
    }, 3000);
  }
};