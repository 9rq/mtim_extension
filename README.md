# mtim extension
chrome用の拡張機能です。
名前を省略しているので適宜読み替えてください。
使用は自己責任でお願いします。

## Install
Google Chromeの拡張機能ストアにて[公開](https://chrome.google.com/webstore/detail/mytim-extension/bimdbekjngpcobigbdhnpmilhoaelgpo)しています。
以下の手順でソースコードからインストールできます。自分でさらに拡張したい場合はどうぞ。

1. githubからソースコードを入手する(下記コマンド参照)
2. [拡張機能設定](chrome://extensions/)(chrome://extensions/)へアクセス
3. パッケージ化されていない拡張機能を読み込む
4. 1で入手したmtimを指定

``` sh:githubからのダウンロード
git clone https://github.com/9rq/mtim_extension.git
```


## Usage
#### 自動入力
打刻確認ページの(勤務|休憩)時間を自動で入力します。
デフォルト入力内容は9-12-12-13-13-18です。
自動入力したい日の日付をクリックしてください。

#### 設定
[打刻確認](whm.accenture.com/mytim/secure/punchClock/confirm)ページにて拡張機能アイコンをクリックすることで、設定画面を表示できます。
設定画面では、自動入力の内容を変更することができます。
addボタンで追加、×ボタンで削除ができます。変更を反映させるためにはsaveボタンを押してください。
