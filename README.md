# mtim extension
chrome用の拡張機能です。
名前を省略しているので適宜読み替えてください。
拡張機能ストアへは申請中です。
使用は自己責任でお願いします。

## Install
以下の手順でインストールできますが、chromeを起動する度に読み込み直す必要があります。

1. githubからソースコードを入手する(下記コマンド参照)
2. [拡張機能設定](chrome://extensions/)(chrome://extensions/)へアクセス
3. パッケージ化されていない拡張機能を読み込む
4. 1で入手したmtimを指定

``` sh:githubからのダウンロード
git clone https://github.com/9rq/mtim_extension.git
```


## Usage
#### 1.自動入力
打刻確認ページの(勤務|休憩)時間を自動で入力します。
入力内容は固定(9-12-12-13-13-18)です。
自動入力したい日の日付をクリックしてください。



## Todo
    - 指定時刻にmtimを起動
    - 自動打刻
    - 自動入力のデフォルト値の設定
    - storageの初期値
    - 削除ボタン

## Log
    1. mtim内に時計を表示
        - 秒数まで表示して時間が切り替わるまでをわかりやすくする
        - DOM操作により、ページ内に時計を追加

    2. 固定時間の入力
        - 9:00-18:00の自動入力
        - 日付をクリックすることで発火

    3. Page\_actionの追加
        - 特定のページを開いた時にpage\_actionを表示する
            - permissionsにdeclarativeContent, tabsを追加
            - backgroundに条件を追加
        - 表示するためのpopup.(html|css|js)の作成
            - storageによりsave, loadの実装

    4. 削除ボタンの追加
        - 時刻のinputの横に削除ボタンを追加

    5. 初期値の設定
        - 最初にgetする際にエラーが起きないように

    6. Issue#1が発覚
        - storageによる実装は困難か
        - 自分のPCでは動作確認完了

    7. chrome.storage→window.localStorage
        - ストレージの変更

## Issues
    1. storageが使えない
        - DLP softwareが原因の可能性
        - [stack overflow](https://stackoverflow.com/questions/65330640/chrome-extension-chrome-storage-calls-fail-due-to-io-error-000001-dbtmp-c)
