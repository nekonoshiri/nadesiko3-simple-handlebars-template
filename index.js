import Handlebars from "handlebars";

export default {
  meta: {
    type: "const",
    value: {
      pluginName: "nadesiko3-simple-handlebars-template",
      description:
        "Handlebars テンプレートを扱うためのシンプルな JS プラグイン。",
      pluginVersion: "0.0.1",
      nakoRuntime: ["cnako"],
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
