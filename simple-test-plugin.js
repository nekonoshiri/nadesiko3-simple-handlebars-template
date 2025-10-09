import test from "node:test";

export default {
  meta: {
    type: "const",
    value: {
      pluginName: "simple-test-plugin",
      description: "ユニットテスト実行用の簡易プラグイン。",
      pluginVersion: "0.0.0",
      nakoRuntime: ["cnako"],
      nakoVersion: "3.7.8",
    },
  },

  テスト実行時: {
    // @テストを定義するための関数。単に `node:test` モジュールの `test` 関数を呼び出すだけです。 // @てすとじっこうしたとき
    type: "func",
    josi: [["を"], ["の"]],
    fn: function (testFunc, testName, sys) {
      // `testFunc` 引数の型は
      //
      // - 無名関数 `……には` を利用して呼び出した場合は `function`
      // - `「関数名」を「テスト名」のテスト実行時` の形で呼び出した場合は `string`
      //
      // となる。後者の場合は `sys.__findFunc()` を用いて関数を取得する。
      const f = (() => {
        if (typeof testFunc === "function") {
          return testFunc;
        }
        if (typeof testFunc === "string") {
          const tf = sys.__findFunc(testFunc, "テスト実行時");
          if (typeof tf === "function") {
            return tf;
          }
        }
        throw new Error(
          "『テスト実行時』関数の第一引数には関数名を文字列で指定するか、無名関数（……には）を用いてください。",
        );
      })();

      test(testName, f);
    },
  },
};
