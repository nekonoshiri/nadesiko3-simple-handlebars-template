/**
 * `npm run bump` コマンドを実行した際に呼び出されるスクリプト。
 */

import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

import parser from "@babel/parser";
import recast from "recast";

const [, , ...args] = process.argv;

if (args.length !== 1) {
  const msg =
    args.length === 0
      ? "引数を指定してください。"
      : "引数は１つだけ指定してください。";
  console.error(`エラー: ${msg}詳細については README.md を参照してください。`);
  process.exit(1);
}

const version = args[0];

if (!/^[0-9]+\.[0-9]+\.[0-9]+$/.test(version)) {
  console.error(
    "エラー: バージョンは X.Y.Z の形式で指定してください（例: 1.2.3）",
  );
  process.exit(1);
}

// index.js ファイル内の pluginVersion を新しいバージョンに書き換える
{
  const filepath = "index.js";
  console.log(
    `${filepath} ファイル内の pluginVersion を ${version} に書き換えます...`,
  );

  // Note. デフォルトの Esprima パーサだとオプショナルチェーン演算子 (`?.`) が読めない（？）ようなので
  // Babel のパーサを利用しています
  const ast = recast.parse(await readFile(filepath, "utf8"), { parser });

  let updated = false;
  recast.visit(ast, {
    // "pluginVersion" キーを探し、その値を新しいバージョンに書き換える
    visitObjectProperty(path) {
      const node = path.node;
      if (node.key.type === "Identifier" && node.key.name === "pluginVersion") {
        node.value.value = version;
        updated = true;
        return false; // 探索終了
      }
      this.traverse(path); // 探索続行
    },
  });

  if (!updated) {
    console.error(
      `エラー: ${filepath} ファイル内で pluginVersion キーを探しましたが、見つかりませんでした。`,
    );
    process.exit(1);
  }

  await writeFile(filepath, recast.print(ast).code, "utf8");
  console.log(
    `${filepath} ファイル内の pluginVersion を ${version} に書き換えました。`,
  );
}

// package.json/package-lock.json ファイル内の version を新しいバージョンに書き換える
{
  console.log(
    `package.json/package-lock.json ファイル内の version を ${version} に書き換えます...`,
  );

  try {
    // Note. `npm version` コマンドはデフォルトだと Git タグも作成しますが、ファイルに変更がある状態だと
    // Git タグが作成できなかったりするので、Git タグはここでは作成しないようにします。詳細については
    // README.md を参照してください。
    await promisify(execFile)("npm", [
      "version",
      version,
      "--no-git-tag-version",
    ]);
  } catch (error) {
    console.error(
      "エラー: package.json/package-lock.json ファイル内の version の書き換えに失敗しました:",
      error.message,
    );
    process.exit(1);
  }

  console.log(
    `package.json/package-lock.json ファイル内の version を ${version} に書き換えました。`,
  );
}

// wnako ランタイム用のバンドルファイル内にもプラグインのバージョンが含まれるため、それを更新する
{
  console.log("wnako ランタイム用のバンドルファイルを再生成します...");

  try {
    await promisify(execFile)("npm", ["run", "build"]);
  } catch (error) {
    console.error(
      "エラー: wnako ランタイム用のバンドルファイルの再生成に失敗しました:",
      error.message,
    );
    process.exit(1);
  }

  console.log("wnako ランタイム用のバンドルファイルを再生成しました。");
}
