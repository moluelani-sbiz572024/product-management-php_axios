'use strict';

/**
 * 商品管理アプリ・描画オブジェクト
 */
const prodRender = {
  brandlink: document.querySelector('nav>a'),
  subject:   document.querySelector('article>p'),
  footer:    document.querySelector('footer>p'),
  
  /**
   * 画面初期処理
   */
  initialize() {
    const title = prodComp.title.top;
    document.title = title;
    this.brandlink.textContent = title;
    if (this.subject) {
      this.subject.textContent = prodComp.subject;
    }
    this.footer.innerHTML = prodComp.getFooter(title);
  },

  /**
   * 商品一覧描画処理
   * @param {*} result 商品データ
   * @param {*} resp 商品データ表示フック(DOM)
   */
  respTableItem(result, resp) {
    result.forEach((item) => {
      const pcode = prodComp.cell.prodCode(item.product_code);
      const pname = prodComp.cell.prodName(item.product_name);
      const price = prodComp.cell.price(item.price);
      const stock = prodComp.cell.stockQuantity(item.stock_quantity);
      const vcode = prodComp.cell.vendorCode(item.vendor_code);
      const edit = prodComp.cell.edit(item.id);
      const remove = prodComp.cell.remove(item.id);
      resp.innerHTML += `<tr>${pcode}${pname}${price}${stock}${vcode}${edit}${remove}</tr>`;   
    });
  },

  // 正常時メッセージ
  okey: {
    readProductsMessage() {
      prodComp.nav_mesg.textContent = '商品情報を読み込みました。';
    },
    entryProductsMessage() {
      prodComp.nav_mesg.textContent = '商品情報の登録を行いました。';
    },
    modifyProductsMessage() {
      prodComp.nav_mesg.textContent = '商品情報の更新を行いました。';
    },
    removeProductsMessage() {
      prodComp.nav_mesg.textContent = '商品情報の削除を行いました。';
    }
  },

  // 異常時メッセージ
  err: {
    readProductsMessage() {
      prodComp.nav_mesg.textContent = '商品情報の読み込みに失敗しました。';
    },
    readVendorsMessage() {
      prodComp.nav_mesg.textContent = '仕入先コードの読み込みに失敗しました。';
    },
    entryProductsMessage() {
      prodComp.nav_mesg.textContent = '商品情報の登録に失敗しました。';
    },
    modifyProductMessage() {
      prodComp.nav_mesg.textContent = '商品情報の更新に失敗しました。';
    },
    removeProductsMessage() {
      prodComp.nav_mesg.textContent = '商品情報の削除に失敗しました。';
    }
  },
  
  /**
   * 指定テキストをメッセージ領域に表示する
   * @param {*} text メッセージテキスト
   */
  renderMessage(text) {
    prodComp.nav_mesg.textContent = text;
  },

  /**
   * 表示メッセージを指定秒数後にクリアする
   * @param {*} delay クリアのタイミングを示すミリ秒数
   */
  clearMessage(delay) {
    setTimeout(() => {
      prodComp.nav_mesg.textContent = '';
    }, delay);
  },

};

/**
 * 商品管理アプリ・サーバープロセス
 */
const prodService = {
  /**
   * 異常メッセージをポップアップ表示する（内部メソッド）
   * @param {*} code エラーコード
   */
  _invalid(code) {
    window.alert(`${code}: 通信異常を検知しました`);
  },

  /**
   * エラー情報をポップアップ表示とコンソール出力する（内部メソッド）
   * @param {*} error エラー情報
   */
  _error(error) {
    console.error(error);
    window.alert(error);
  },

  /**
   * GETリクエストを行う
   * @param {*} act 実行アクション
   * @param {*} resp 実行結果
   * @param {*} param 実行時パラメーター
   */
  doGet(act, resp, param = null) {
    if (param == null) {
      axios.get(act).then((response) => {
        if (response.status !== 200) {
          this._invalid(response.status);
          return;
        }
        resp.code = response.status;
        resp.status = (response.statusText === 'OK') ? true : false;
        resp.data = response.data;
      })
      .catch((error) => {
        this._error(error);
      });

    } else {
      axios.get(act, {params: param}).then((response) => {
        if (response.status !== 200) {
          this._invalid(response.status);
          return;
        }
        resp.code = response.status;
        resp.status = (response.statusText === 'OK') ? true : false;
        resp.data = response.data;
      })
      .catch((error) => {
        this._error(error);
      });
    }
  },

  /**
   * POSTリクエストを行う
   * @param {*} act 実行アクション
   * @param {*} resp 実行結果
   * @param {*} param 実行時パラメーター
   */
  doPost(act, resp, param = null) {
    axios.post(act, param).then((response) => {
      if (response.status !== 200) {
        this._invalid(response.status);
        return;
      }
      resp.code = response.status;
      resp.status = (response.statusText === 'OK') ? true : false;
      resp.data = response.data;
    })
    .catch((error) => {
      this._error(error);
    });
  },
};