# mtim extension
chrome用の拡張機能です。
名前を省略しているので適宜読み替えてください。
使用は自己責任でお願いします。
<br>
現在、初期化が上手く行かずに最初にエラーが発生することがあります。
拡張機能の再読み込み、打刻確認ページのリロードをすると動くようになるので試してみてください。

## Install
Google Chromeの拡張機能ストアにて[公開](https://chrome.google.com/webstore/detail/mytim-extension/bimdbekjngpcobigbdhnpmilhoaelgpo)しています。
chromeに追加することででインストールできます。
<br>
また、以下の手順でソースコードからインストールすることもできます。自分でさらに拡張したい場合はどうぞ。

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
自動入力したい日の日付(薄い紫色の箇所)をクリックしてください。

#### 設定
[打刻確認](whm.accenture.com/mytim/secure/punchClock/confirm)ページにて拡張機能アイコンをクリックすることで、設定画面を表示できます。
設定画面では、自動入力の内容を変更することができます。
addボタンで追加、×ボタンで削除ができます。変更を反映させるためにはsaveボタンを押してください。
<img src="https://github.com/9rq/mtim_extension/blob/main/images/example0.png">

設定画面のチェックボックスをオンにすると、±5分の範囲で時間をずらした入力ができます。

## History
#### v1.1
自動入力機能の実装
#### v1.2
設定画面の追加、入力内容が編集可能に
<br>
初期化エラー発生

##### v1.2.1
初期化エラーの解消

#### v1.3
ランダム要素の追加
<br>
設定メニューにチェックボックスを追加
