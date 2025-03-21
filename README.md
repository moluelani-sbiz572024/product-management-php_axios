# 商品管理アプリ SPA版

- 商品管理アプリ PHP版をベースに Axios を導入
- 基本的仕様は同じとし、Axios用に部分的に改造
- HTML/JavaScript/PHP を出来るだけ用途別に分離
  - HTML : レンダリング
  - JavaScript : レンダリング、サーバーサイドへのリクエスト／レスポンス
  - PHP : サーバーサイド・プロセス、データベースアクセス
- JavaScript/PHP 間は JSON でデータ通信する
- 出来るだけ SPA 型とするが必要に応じて画面遷移をする
- 画面遷移は出来るだけ HTML 間とする
