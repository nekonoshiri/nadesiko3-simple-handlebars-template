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

### `（テンプレートを）（オプションの）オプション付テンプレートコンパイル`

- `テンプレート`: 文字列。
- `オプション`: 辞書型変数。テンプレートのコンパイル時に渡すオプションを指定します。

テンプレートをコンパイルして返します。コンパイルされたテンプレートは「テンプレート評価」関数に渡すことで評価（展開）できます。

`オプション` 引数で指定できるオプションは以下の通りです：

- `データ使用許可` もしくは `data`: 偽を指定すると `@` で始まる変数を無視します[^1]。デフォルトは真です。
- `互換モード` もしくは `compat`: Mustache テンプレートとの互換性を保つためのオプションです。真を指定すると、例えば `{{foo}}` という式を評価する際に、現在のコンテキスト内に `foo` というキーが見つからなければ再帰的に親コンテキストも探索するようになります。デフォルトは偽です。
- `既知ヘルパー` もしくは `knownHelpers`: テンプレートの評価時に使用されるヘルパーの一覧を渡すことで、コンパイラが最適化を行いやすくします。キーをヘルパー名、値を真偽値[^2]とする辞書型変数を渡します。
- `既知ヘルパー限定` もしくは `knownHelpersOnly`: 真を指定すると、`既知ヘルパー` オプションで指定された値を利用してさらに最適化を行います[^3]。デフォルトは偽です。
- `HTMLエスケープ無効化` もしくは `noEscape`: 真を指定すると HTML のエスケープを行わなくなります。デフォルトは偽です。
- `厳格モード` もしくは `strict`: 真を指定すると、例えば `{{foo}}` という式を評価する際に `foo` というキーが見つからなければエラーを発生させるようになります。デフォルトは偽です。
- `オブジェクト存在確認無効化` もしくは `assumeObjects`: 真を指定すると、例えば `{{foo.bar}}` という式を評価する際に `foo` に `bar` が存在することの確認を行わないようになります[^4]。デフォルトは偽です。
- `自動インデント無効化` もしくは `preventIndent`: 真を指定すると partial（部分テンプレート）使用時の自動インデントを無効化します。デフォルトは偽です。
- `スタンドアロンタグ空白除去無効化` もしくは `ignoreStandalone`: 真を指定すると、例えば `{{/each}}` などの単独のタグのみからなるような行のスペース等が削除されないようになります。デフォルトは偽です。
- `パーシャル暗黙コンテキスト無効化` もしくは `explicitPartialContext`: 真を指定すると、partial に明示的にコンテキストを渡さなかった場合に空のコンテキストが渡されるようになります。デフォルトは偽です。

[^1]: 偽を指定した場合でも、テンプレート内に変数が存在すると自動的に真になるようです。

[^2]: 値が真の場合はそのヘルパーを「既知のヘルパー」リストに含め、偽の場合はそのヘルパーを「既知のヘルパー」リストから除外します。ビルトインのヘルパーについては自動的に「既知のヘルパー」リストに含まれますが、偽を指定することでリストから除外することができます。

[^3]: つまり、「既知のヘルパー」リストに含まれていないヘルパーは正しく動作しなくなるかもしれません。

[^4]: つまり、存在しないフィールドへのアクセスはエラーになるかもしれません。

各オプションの詳細については [(Pre-)Compilation | Handlebars](https://handlebarsjs.com/api-reference/compilation.html) を参照してください。

なお、日本語でのオプション名（例えば `データ使用許可`）とそれに対応する本来のオプション名（例えば `data`）が同時に指定された場合は、本来のオプション名での指定が優先されます。

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

### `（コンパイル済テンプレートを）（コンテキストで）（オプションの）オプション付テンプレート評価`

- `コンパイル済テンプレート`: `テンプレートコンパイル` 関数の戻り値。
- `コンテキスト`: 辞書型変数。テンプレートに渡す入力を指定します。
- `オプション`: 辞書型変数。テンプレートに渡すオプションを指定します。

コンパイルされたテンプレートをオプション付きで評価（展開）して結果を返します。

`オプション` 引数で指定できるオプションは以下の通りです：

- `データ` もしくは `data`: テンプレートにカスタム変数を渡す際に使用します。
- `ヘルパー` もしくは `helpers`: テンプレートにカスタムヘルパーを渡す際に使用します。
- `パーシャル` もしくは `partials`: テンプレートにカスタム partial（部分テンプレート）を渡す際に使用します。
- その他 [Runtime options | Handlebars](https://handlebarsjs.com/api-reference/runtime-options.html) に記載されているオプション

各オプションの詳細については [Runtime options | Handlebars](https://handlebarsjs.com/api-reference/runtime-options.html) を参照してください。

なお、日本語でのオプション名（例えば `データ`）とそれに対応する本来のオプション名（例えば `data`）が同時に指定された場合は、本来のオプション名での指定が優先されます。

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
- `npm run bump`: 新しいバージョンのリリース時に使用します（後述）。

### 新しいバージョンのリリース方法

新しいバージョンをリリースする場合は、以下のフローに従ってください。

#### 1. プラグインのバージョンが記載されているファイルの更新

当プラグインのバージョンは `package.json`、`package-lock.json`、`index.js` などいくつかのファイルに記載されているため、それらの値を更新します。

`npm run bump -- X.Y.Z` コマンド（ただし `X.Y.Z` にはリリースされる新しいバージョンを指定します）を実行すると、自動で該当箇所を更新します。

例：

```sh
# package.json ファイルの version フィールドの値などを 1.2.3 に更新する
npm run bump -- 1.2.3
```

バージョンを更新したら、通常の開発フロー通りプルリクエストを作成して `main` ブランチにマージします。

#### 2. Git タグの作成

1 の変更が `main` ブランチにマージされたことを確認してから、リリースするバージョンの Git タグを作成し、GitHub に push します。

例：

```sh
# ローカルの main ブランチを更新していなかった場合は更新する
git switch main
git pull

git tag -a v1.2.3 -m "hogehoge を実装。"
git push origin v1.2.3
```

#### 3. ワークフローの確認

GitHub にタグが push されると、`package.json` ファイルのバージョン等が正しく更新されているかを確認する GitHub Actions ワークフローが実行されます。

ワークフローが失敗（異常終了）した場合はタグを削除してからワークフローが成功するように修正し、再度タグを作成します。

#### 4. GitHub Releases でのリリースの作成

GitHub 上で、タグを指定してリリースを作成します。

#### 5. npm レジストリへの公開 (publish)

GitHub 上でリリースを作成すると、npm レジストリへの公開 (publish) を行うワークフローが起動し、承認待ち状態となります。

このワークフローを承認することで、npm レジストリへの公開が行われます。

## ライセンスについて

このプラグイン自体（依存ライブラリ等を除く）は CC0 1.0 Universal です。

※ 当ファイル (README) 内の表記と [LICENSE](LICENSE) ファイルの表記が異なる場合は [LICENSE](LICENSE) ファイルを優先します。

ただし、[`nadesiko3-simple-handlebars-template.js`](nadesiko3-simple-handlebars-template.js) ファイルなどサードパーティライブラリが含まれているものについては、それぞれのライブラリのライセンスに従ってください。

※ [`nadesiko3-simple-handlebars-template.js`](nadesiko3-simple-handlebars-template.js) ファイルについては当該ファイル内にもコメント形式でサードパーティライブラリのライセンス表記を含めています。
