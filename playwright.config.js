/**
 * Playwright の設定ファイル。
 */
import { defineConfig } from "@playwright/test";

export default defineConfig({
  // Playwright でのテスト時に web サーバーを自動で立ち上げる
  webServer: {
    // サーバーを立ち上げるためのコマンド
    command: "node test-server.js",

    // Playwright がサーバーが起動しているかどうか確認するためにアクセスする URL
    url: "http://localhost:3000",

    // CI 環境 *以外* では、すでにサーバーが立ち上がっている場合は再利用する
    reuseExistingServer: !process.env.CI,
  },
});
