import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

import license from "rollup-plugin-license";
import nodePolyfills from "rollup-plugin-polyfill-node";

// cnako ランタイム用の index.mjs ファイルから wnako ランタイム用の bundle.mjs ファイルを作成するように設定する。
// wnako ランタイム用の bundle.js では、サードパーティの依存ライブラリも含めて全てをバンドルする。
export default {
  input: "index.mjs",

  output: {
    file: "bundle.js",
    format: "iife",
  },

  plugins: [
    commonjs(), // CommonJS 形式のファイルを読み込めるようにする
    nodeResolve(), // サードパーティライブラリもバンドルする
    terser(), // Terser を利用して minify する
    nodePolyfills(), // Node.js モジュールの polyfill を行う
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
        includeSelf: true, // 自分のライセンスも含める
      },
    }),
  ],

  // index.mjs ファイル内に（cnako ランタイム用の）export 文があるため、
  // バンドル時に「export 文があるのに output.name オプションが指定されていない」という旨の警告が発生する。
  // その警告を抑えるための設定。
  onwarn(warning, defaultHandler) {
    if (warning.code === "MISSING_NAME_OPTION_FOR_IIFE_EXPORT") {
      return;
    }
    defaultHandler(warning);
  },
};
