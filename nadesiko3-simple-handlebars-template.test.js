/**
 * wnako ランタイム用にバンドルされたファイルのテスト。
 *
 * このファイルは自動生成では *ない* ため、直接編集可能です。
 */

import path from "node:path";
import { test, expect } from "@playwright/test";

test("バンドルファイルをscriptタグで読み込む場合", async ({ page }) => {
  await page.goto(`file://${path.resolve("test-wnako-script.html")}`);
  await expect(page.getByText("テスト成功")).toBeVisible();
});

test("バンドルファイルを取り込む文で読み込む場合", async ({ page }) => {
  await page.goto(`file://${path.resolve("test-wnako-torikomu.html")}`);
  await expect(page.getByText("テスト成功")).toBeVisible();
});
