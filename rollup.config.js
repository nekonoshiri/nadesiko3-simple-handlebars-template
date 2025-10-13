import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

import license from "rollup-plugin-license";

// cnako ランタイム用の index.js ファイルから wnako ランタイム用の nadesiko3-simple-handlebars-template.js ファイルを作成するように設定する。
// wnako ランタイム用の nadesiko3-simple-handlebars-template.js では、サードパーティの依存ライブラリも含めて全てをバンドルする。
export default {
  input: "index.js",

  output: {
    file: "nadesiko3-simple-handlebars-template.js",
    format: "iife",
  },

  plugins: [
    // CommonJS 形式のファイルを読み込めるようにする
    commonjs(),

    // サードパーティライブラリもバンドルする
    nodeResolve({
      // サードパーティライブラリがブラウザ向けのモジュールを提供している
      // (例えば package.json で `browser` フィールドが指定されている)
      // 場合はそれを使用する
      browser: true,
    }),

    // Terser を利用して minify する
    terser(),

    // 当パッケージ及びサードパーティライブラリのライセンスを出力する
    license({
      // 出力される JavaScript ファイル内にライセンスを含める
      banner: {
        commentStyle: "ignored", // ライセンスを表記したコメントが minify されないようにする
        content: `
================================================================================
ライセンス一覧
================================================================================

<% _.forEach(dependencies, function (dependency) { %>

--------------------------------------------------------------------------------
<%= dependency.name %>@<%= dependency.version %>
License: <%= dependency.license %>
<%= dependency.licenseText %>
--------------------------------------------------------------------------------

<% }) %>
        `,
      },
      thirdParty: {
        includeSelf: true, // 当パッケージのライセンスも含める
      },
    }),
  ],

  // index.js ファイル内に（cnako ランタイム用の）export 文があるため、
  // バンドル時に「export 文があるのに output.name オプションが指定されていない」という旨の警告が発生する。
  // その警告を抑えるための設定。
  onwarn(warning, defaultHandler) {
    if (warning.code === "MISSING_NAME_OPTION_FOR_IIFE_EXPORT") {
      return;
    }
    defaultHandler(warning);
  },
};
