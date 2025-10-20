# nadesiko3-simple-handlebars-template

[![GitHub License](https://img.shields.io/github/license/nekonoshiri/nadesiko3-simple-handlebars-template)](https://github.com/nekonoshiri/nadesiko3-simple-handlebars-template/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/nadesiko3-simple-handlebars-template)](https://www.npmjs.com/package/nadesiko3-simple-handlebars-template)
[![ユニットテストの実行](https://github.com/nekonoshiri/nadesiko3-simple-handlebars-template/actions/workflows/test.yml/badge.svg)](https://github.com/nekonoshiri/nadesiko3-simple-handlebars-template/actions/workflows/test.yml)

プログラミング言語「[なでしこ3](https://github.com/kujirahand/nadesiko3)」で Handlebars テンプレートを扱うためのシンプルな JS プラグインです。

このプラグインでは Handlebars テンプレートエンジンのいくつかの機能のみを提供します。

## 利用方法について

このプラグインは wnako ランタイム（ブラウザ版）及び cnako ランタイム（Node.js 版）で利用可能です。

### wnako ランタイム（ブラウザ版）

取り込む文または `<script>` タグを用いて jsDelivr からプラグインを取り込むことができます。

※ wnako ランタイム用の `nadesiko3-simple-handlebars-template.js` ファイルにはサードパーティライブラリが含まれています。[ライセンスについて](#ライセンスについて) セクションも参照してください。

#### 取り込む文を使う場合

`拡張プラグイン` 構文を用いて取り込むことができます：

```nako3
！「拡張プラグイン:simple-handlebars-template.js」を取り込む。
変数　コンパイル済テンプレート＝『こんにちは、{{名前}}。』をテンプレートコンパイル。
コンパイル済テンプレートを｛『名前』：『太郎』｝でテンプレート評価して表示。
```

`！「拡張プラグイン:simple-handlebars-template.js@X.Y.Z」を取り込む。` のようにバージョンを明示的に指定して取り込むことも可能です（`@X.Y.Z` の部分に取り込みたいバージョン（例えば `@1.0.0`）を指定します）。

#### `<script>` タグを使う場合

HTML 内で `<script>` タグを用いて取り込むことも可能です：

```html
<script src="https://nadesi.com/v3/cdn.php?v=3.7.8&f=release/wnako3.js&run"></script>
<script src="https://cdn.jsdelivr.net/npm/nadesiko3-simple-handlebars-template/nadesiko3-simple-handlebars-template.js"></script>

<script type="なでしこ">
  変数　コンパイル済テンプレート＝『こんにちは、{{名前}}。』をテンプレートコンパイル。
  コンパイル済テンプレートを｛『名前』：『太郎』｝でテンプレート評価して言う。
</script>
```

`<script src="https://cdn.jsdelivr.net/npm/nadesiko3-simple-handlebars-template@X.Y.Z/nadesiko3-simple-handlebars-template.js"></script>` のようにバージョンを明示的に指定して取り込むことも可能です（`@X.Y.Z` の部分に取り込みたいバージョン（例えば `@1.0.0`）を指定します）。

### cnako ランタイム（Node.js 版）

npm（または Yarn、pnpm 等）を利用してプラグインを取り込むことができます。

npm の使い方については省略します。

例：

```sh
npm install nadesiko3-simple-handlebars-template
```

```nako3
！「nadesiko3-simple-handlebars-template」を取り込む。
変数　コンパイル済テンプレート＝『こんにちは、{{名前}}。』をテンプレートコンパイル。
コンパイル済テンプレートを｛『名前』：『太郎』｝でテンプレート評価して表示。
```

## 提供されている関数

### `（テンプレートを）テンプレートコンパイル`

- `テンプレート`: 文字列。

テンプレートをコンパイルして返します。コンパイルされたテンプレートは「テンプレート評価」関数に渡すことで評価（展開）できます。

テンプレート（Handlebars テンプレート）の仕様については [Introduction | Handlebars](https://handlebarsjs.com/guide) を参照してください。

### `（コンパイル済テンプレートを）（コンテキストで）テンプレート評価`

- `コンパイル済テンプレート`: `テンプレートコンパイル` 関数の戻り値。
- `コンテキスト`: 辞書型変数。テンプレートに渡す入力を指定します。

コンパイルされたテンプレートを評価（展開）して結果を返します。

#### 例

```nako3
変数　コンパイル済テンプレート＝『こんにちは、{{名前}}。』をテンプレートコンパイル。
コンパイル済テンプレートを｛『名前』：『太郎』｝でテンプレート評価して表示。
```

`こんにちは、太郎。` と出力されます。

## 開発環境について

このリポジトリ自体の開発を行う際に必要な情報を以下に示します。

### 必要なもの

- Node.js (v22 以上)
- npm

### 準備

以下のコマンドで依存パッケージをインストールします。

```sh
npm install

# Playwright が使用するテスト用のブラウザをインストール
npx playwright install
```

### 利用できるスクリプト

- `npm run build`: cnako ランタイム用の `index.js` ファイルから、wnako ランタイム用にバンドルされた `nadesiko3-simple-handlebars-template.js` ファイルを生成します。
- `npm run format`: リポジトリ内のファイルを整形します。
- `npm run format:check`: リポジトリ内のファイルが整形されているかどうか確認します。
- `npm run lint`: 静的解析を行います。
- `npm run test:cnako`: cnako ランタイム用のファイルのテストを実行します。
- `npm run test:wnako`: wnako ランタイム用にバンドルされたファイルのテストを実行します。
- `npm test` または `npm run test`: 全てのテストを実行します。

## ライセンスについて

このプラグイン自体（依存ライブラリ等を除く）は CC0 1.0 Universal です。

※ 当ファイル (README) 内の表記と [LICENSE](LICENSE) ファイルの表記が異なる場合は [LICENSE](LICENSE) ファイルを優先します。

ただし、[`nadesiko3-simple-handlebars-template.js`](nadesiko3-simple-handlebars-template.js) ファイルなどサードパーティライブラリが含まれているものについては、それぞれのライブラリのライセンスに従ってください。

※ [`nadesiko3-simple-handlebars-template.js`](nadesiko3-simple-handlebars-template.js) ファイルについては当該ファイル内にもコメント形式でサードパーティライブラリのライセンス表記を含めています。
