# 02_UpdateLatestStatus
## 要件
サブテーブル内のドロップダウンフィールドの値をサブテーブル外のドロップダウンフィールドにコピーする

## アプリ構成
- 案件管理

## ユースケース
- 案件管理アプリで案件ステータスをドロップダウンフィールドに保存
- サブテーブルフィールドに案件履歴を登録
- 案件ステータスで絞り込みたい。  
  案件ステータスはサブテーブル内に保存されており、  
  案件ステータスで絞り込むと意図した絞り込みができない。  

  -> サブテーブル内の最新の案件ステータスを、サブテーブル外に保存し、案件ステータス毎に絞り込めるようにする。

## ファイル構成
- `base/Util.js`: フィールドコード等を保存
- `App/DisableFields.js`: `UpdateLatestStatus.js`で保存するフィールドを編集不可に
- `App/UpdateLatestStatus.js`: サブテーブル内の最新の案件ステータスをサブテーブル外フィールドに保存
- `App/Init.js`: イベントハンドラーを登録

## ポイント
- サブテーブル内の値で絞り込んだレコード一覧を表示したい場合、  
  サブテーブルに条件を一つでも満たす行があるとそのレコードが抽出されるため注意が必要。

- 配列形式の値(サブテーブルなど)を処理する場合、  
  そのまま`Array.prototype.reduce()`する(**1)より、  
  `Array.prototype.map()`で一度前処理する(**2)方が可読性が高そう。

```js
// **1
return tableRows.reduce(function(currentRow, nextRow, i) {
  if (i === 0) {
    return nextRow;
  }

  var currentRowDate = currentRow.value[ITEM_DATE_CODE].value;
  var nextRowDate = nextRow.value[ITEM_DATE_CODE].value;
  var isCurrentRowLatest = (new Date(currentRowDate).getTime() > new Date(nextRowDate).getTime());

  var currentRowStatus = currentRow.value[ITEM_STATUS_CODE].value;
  var nextRowStatus = nextRow.value[ITEM_STATUS_CODE].value;
  var isCurrentRowDateSameAsLatest = (new Date(currentRowStatus).getTime() === new Date(nextRowStatus).getTime());

  var currentRowPriority = self.priority.indexOf(currentRowStatus);
  var nextRowPriority = self.priority.indexOf(nextRowStatus);
  var isCurrentRowPriorToLatest = (currentRowPriority < nextRowPriority);

  if (isCurrentRowLatest || (isCurrentRowDateSameAsLatest && isCurrentRowPriorToLatest)) {
    return currentRow;
  }
  return nextRow;
}, {});

// **2
return tableRows.map(function(row) {
  return {
    date: row.value[ITEM_DATE_CODE].value,
    status: row.value[ITEM_STATUS_CODE].value,
    priority: self.priority.indexOf(row.value[ITEM_STATUS_CODE].value)
  };
}).reduce(function(currentRow, nextRow, i) {
  if (i === 0) {
    return nextRow;
  }

  var isCurrentRowLatest = (new Date(currentRow.date).getTime() > new Date(nextRow.date).getTime());
  var isCurrentRowDateSameAsLatest = (new Date(currentRow.date).getTime() === new Date(nextRow.date).getTime());
  var isCurrentRowPriorToLatest = (currentRow.priority < nextRow.priority);

  if (isCurrentRowLatest || (isCurrentRowDateSameAsLatest && isCurrentRowPriorToLatest)) {
    return currentRow;
  }
  return nextRow;
}, {});
```