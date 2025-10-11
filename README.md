# nadesiko3-simple-handlebars-template

[![GitHub License](https://img.shields.io/github/license/nekonoshiri/nadesiko3-simple-handlebars-template)](https://github.com/nekonoshiri/nadesiko3-simple-handlebars-template/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/nadesiko3-simple-handlebars-template)](https://www.npmjs.com/package/nadesiko3-simple-handlebars-template)
[![ユニットテストの実行](https://github.com/nekonoshiri/nadesiko3-simple-handlebars-template/actions/workflows/test.yml/badge.svg)](https://github.com/nekonoshiri/nadesiko3-simple-handlebars-template/actions/workflows/test.yml)

プログラミング言語「[なでしこ3](https://github.com/kujirahand/nadesiko3)」で Handlebars テンプレートを扱うためのシンプルな JS プラグインです。

このプラグインでは Handlebars テンプレートエンジンのいくつかの機能のみを提供します。

## 利用方法について

このプラグインは cnako 及び wnako ランタイムで利用可能です。

### cnako ランタイム

TODO

### wnako ランタイム

TODO

※ wnako ランタイム用の `nadesiko3-simple-handlebars-template.js` ファイルにはサードパーティライブラリが含まれています。[ライセンスについて](#ライセンスについて) セクションも参照してください。

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
```

### 利用できるスクリプト

- `npm run build`: cnako ランタイム用の `index.js` ファイルから、wnako ランタイム用にバンドルされた `nadesiko3-simple-handlebars-template.js` ファイルを生成します。
- `npm run format`: リポジトリ内のファイルを整形します。
- `npm run format:check`: リポジトリ内のファイルが整形されているかどうか確認します。
- `npm run lint`: 静的解析を行います。
- `npm test` または `npm run test`: ユニットテスト (`*.test.nako3`) を実行します。

## ライセンスについて

このプラグイン自体（依存ライブラリ等を除く）は CC0 1.0 Universal です。

※ 当ファイル (README) 内の表記と [LICENSE](LICENSE) ファイルの表記が異なる場合は [LICENSE](LICENSE) ファイルを優先します。

ただし、[`nadesiko3-simple-handlebars-template.js`](nadesiko3-simple-handlebars-template.js) ファイルなどサードパーティライブラリが含まれているものについては、それぞれのライブラリのライセンスに従ってください。

※ [`nadesiko3-simple-handlebars-template.js`](nadesiko3-simple-handlebars-template.js) ファイルについては当該ファイル内にもコメント形式でサードパーティライブラリのライセンス表記を含めています。
