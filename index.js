import Handlebars from "handlebars";

/**
 * このプラグイン自体のバージョン。
 *
 * Note. この行は `npm run bump` コマンド実行時に自動で置き換えられます。
 *
 * @see [README.md](./README.md), [bump.sh](./bump.sh)
 */
const PLUGIN_VERSION = "0.0.6";

const plugin = {
  meta: {
    type: "const",
    value: {
      pluginName: "nadesiko3-simple-handlebars-template",
      description:
        "Handlebars テンプレートを扱うためのシンプルな JS プラグイン。",
      pluginVersion: PLUGIN_VERSION,
      nakoRuntime: ["cnako", "wnako"],
      nakoVersion: "3.7.8",
    },
  },

  テンプレートコンパイル: {
    // テンプレートをコンパイルして返します。コンパイルされたテンプレートは「テンプレート評価」関数に渡すことで評価（展開）できます。 // @てんぷれーとこんぱいる
    type: "func",
    josi: [["を"]],
    fn: function (template) {
      return Handlebars.compile(template);
    },
  },

  テンプレート評価: {
    // コンパイルされたテンプレートを評価（展開）して結果を返します。 // @てんぷれーとひょうか
    type: "func",
    josi: [["を"], ["で"]],
    fn: function (template, context) {
      return template(context);
    },
  },
};

// wnako からプラグインを利用するための設定
if (typeof navigator?.nako3?.addPluginObject === "function") {
  navigator.nako3.addPluginObject(
    "nadesiko3-simple-handlebars-template",
    plugin,
  );
}

export default plugin;
