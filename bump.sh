#!/bin/sh
set -eu

# 引数の個数をチェック
if [ "$#" -ne 1 ]; then
  echo '[ERROR] 引数を（１つだけ）指定してください。詳細については README.md を参照してください。'
  exit 1
fi

VERSION=$1

# バージョンの形式が正しいことをチェック
# Note. `expr` コマンドでは正規表現の先頭に ^ がなくても先頭からマッチする（POSIX では ^ は unspecified）
if ! {
  expr "$VERSION" : '[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*$' && \
  # `01.Y.Z` や `X.01.Z` のような 0 始まりのバージョンをはじく
  ! expr "$VERSION" : '0[0-9]' && ! expr "$VERSION" : '.*\.0[0-9]';
} >/dev/null; then
  echo '[ERROR] バージョンは X.Y.Z の形式で指定してください（例: 1.2.3）'
  exit 1
fi

echo "[INFO] index.js ファイル内に記載されているプラグインのバージョンを $VERSION に書き換えます..."
# Note. `sed` コマンドの `-i` オプションは環境によって動作が異なることがあるため避けている
CONTENT=$(sed "/const PLUGIN_VERSION/c\\
const PLUGIN_VERSION = \"$VERSION\";" index.js)
if ! echo "$CONTENT" | grep -q "const PLUGIN_VERSION = \"$VERSION\""; then
  echo '[ERROR] プラグインのバージョンの置換に失敗しました。'
  exit 1
fi
echo "$CONTENT" > index.js

echo "[INFO] package.json/package-lock.json ファイル内の version を $VERSION に書き換えます..."
# Note. CI 等でバージョンの更新を忘れていないかのチェックにも使用するため、
# 現在と同じバージョンが指定されていてもエラーにならないようにしている
npm version --no-git-tag-version --allow-same-version "$VERSION"

echo '[INFO] wnako ランタイム用のバンドルファイルを再生成します...'
npm run build

echo '[INFO] 各ファイルを整形します...'
npm run format

echo '[INFO] バージョンの更新が完了しました。'
