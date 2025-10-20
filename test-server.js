/**
 * wnako ランタイム用にバンドルされた `nadesiko3-simple-handlebars-template.js`
 * ファイルをテストする際に使用するテストサーバーを立てるためのスクリプト。
 *
 * テストサーバーは Playwright でのテスト実行時に自動で立てられます。詳細については
 * `playwright.config.js` 及び `nadesiko3-simple-handlebars-template.test.js`
 * ファイルを参照してください。
 */

import fs from "node:fs/promises";
import http from "node:http";

const server = http.createServer(async (req, res) => {
  // wnako ランタイム用にバンドルされたファイルを返す
  if (req.url === "/nadesiko3-simple-handlebars-template.js") {
    const content = await fs.readFile(
      "./nadesiko3-simple-handlebars-template.js",
    );
    res.writeHead(200, {
      // 実際に jsDelivr 経由でファイルを取得した時のレスポンスヘッダに合わせています
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/javascript; charset=utf-8",
    });
    res.end(content);
    return;
  }

  // wnako ランタイムを返す
  if (req.url === "/wnako3.js?run") {
    const content = await fs.readFile(
      "./node_modules/nadesiko3/release/wnako3.js",
    );
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/javascript; charset=utf-8",
    });
    res.end(content);
    return;
  }

  // Playwright がサーバーの起動確認のためにアクセスしてくるので 204 を返す
  // (playwright.config.js ファイルを参照)
  res.writeHead(204).end();
});

server.listen(3000, () => {
  console.log("サーバーが起動しました");
});
