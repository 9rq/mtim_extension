## Todo
- 指定時刻にmtimを起動
- 自動打刻

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
    - content scriptとpopupでlocalStorageを共有できない

8. メッセージングによるlocalStorageの共有
    - popupには保持せず、content scriptへリクエスト

9. Issue#2を解決
    - chromeとfirefoxでメッセージの受け取り方法が違うことが原因
    - callbackを適切に指定

10. Issue#3を解決
    - listenerがないページでもpopupが開けてしまう
    - popupを開くにはcontent scriptとのやりとりが必要なため、popupを開けるページを制限

11. Issue#4を解決
    - エラー発生を検知し、自動でreloadをすることでlistenerを読み込ませる

12. contextMenuにmtimへのリンクを追加
    - mtimへのアクセスを楽に

13. random要素の追加
    - ±5分の幅でランダムに時間をずらす設定を追加

## Issues
1. storageが使えない
    - DLP softwareが原因の可能性
    - [stack overflow](https://stackoverflow.com/questions/65330640/chrome-extension-chrome-storage-calls-fail-due-to-io-error-000001-dbtmp-c)

2. ~~Log#8 loadリクエストが動かない~~
    - callbackを指定して受け取ることはできている
    - loadLocalStorage関数の戻り値が上手く行かない
    - Log#9で解決

3. ~~puchClockでpopupが正常に動作しない~~
    - backgroundでpopupのアクセスに制限をかけることで対応
    - Log#10で解決

4. ~~v1.2 update時にエラーが発生する~~
    - mtimを開いたままupdateし、popupを開くと発生
    - 新たに追加したlistenerが準備される前にメッセージが送られることが原因
