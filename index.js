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

  オプション付テンプレートコンパイル: {
    // テンプレートをオプション付きでコンパイルして返します。コンパイルされたテンプレートは「テンプレート評価」関数に渡すことで評価（展開）できます。 // @おぷしょんつきてんぷれーとこんぱいる
    type: "func",
    josi: [["を"], ["の"]],
    fn: function (template, options) {
      return Handlebars.compile(template, {
        data: options?.データ使用許可,
        compat: options?.互換モード,
        knownHelpers: options?.既知ヘルパー,
        knownHelpersOnly: options?.既知ヘルパー限定,
        noEscape: options?.HTMLエスケープ無効化,
        strict: options?.厳格モード,
        assumeObjects: options?.オブジェクト存在確認無効化,
        preventIndent: options?.自動インデント無効化,
        ignoreStandalone: options?.スタンドアロンタグ空白除去無効化,
        explicitPartialContext: options?.パーシャル暗黙コンテキスト無効化,
        ...options,
      });
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

  オプション付テンプレート評価: {
    // コンパイルされたテンプレートをオプション付きで評価（展開）して結果を返します。 // @おぷしょんつきてんぷれーとひょうか
    type: "func",
    josi: [["を"], ["で"], ["の"]],
    fn: function (template, context, options) {
      return template(context, {
        data: options?.データ,
        helpers: options?.ヘルパー,
        partials: options?.パーシャル,
        ...options,
      });
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
