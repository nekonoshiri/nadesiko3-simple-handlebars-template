import Handlebars from "handlebars";

/**
 * このプラグイン自体のバージョン。
 *
 * Note. この行は `npm run bump` コマンド実行時に自動で置き換えられます。
 *
 * @see [README.md](./README.md), [bump.sh](./bump.sh)
 */
const PLUGIN_VERSION = "1.0.0";

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
      const opts = {};
      if (Object.hasOwn(options, "データ使用許可")) {
        opts.data = options.データ使用許可;
      }
      if (Object.hasOwn(options, "互換モード")) {
        opts.compat = options.互換モード;
      }
      if (Object.hasOwn(options, "既知ヘルパー")) {
        opts.knownHelpers = options.既知ヘルパー;
      }
      if (Object.hasOwn(options, "既知ヘルパー限定")) {
        opts.knownHelpersOnly = options.既知ヘルパー限定;
      }
      if (Object.hasOwn(options, "HTMLエスケープ無効化")) {
        opts.noEscape = options.HTMLエスケープ無効化;
      }
      if (Object.hasOwn(options, "厳格モード")) {
        opts.strict = options.厳格モード;
      }
      if (Object.hasOwn(options, "オブジェクト存在確認無効化")) {
        opts.assumeObjects = options.オブジェクト存在確認無効化;
      }
      if (Object.hasOwn(options, "自動インデント無効化")) {
        opts.preventIndent = options.自動インデント無効化;
      }
      if (Object.hasOwn(options, "スタンドアロンタグ空白除去無効化")) {
        opts.ignoreStandalone = options.スタンドアロンタグ空白除去無効化;
      }
      if (Object.hasOwn(options, "パーシャル暗黙コンテキスト無効化")) {
        opts.explicitPartialContext = options.パーシャル暗黙コンテキスト無効化;
      }
      return Handlebars.compile(template, {
        ...opts,
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
      const opts = {};
      if (Object.hasOwn(options, "データ")) {
        opts.data = options.データ;
      }
      if (Object.hasOwn(options, "ヘルパー")) {
        opts.helpers = options.ヘルパー;
      }
      if (Object.hasOwn(options, "パーシャル")) {
        opts.partials = options.パーシャル;
      }
      return template(context, {
        ...opts,
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
