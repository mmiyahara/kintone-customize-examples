# 01_LookupEditable
## 要件
ルックアップ先フィールドを編集可能にする。

## アプリ構成
- 顧客管理
- 案件管理

## ユースケース
- 顧客管理から案件管理に、顧客名とメールアドレスをルックアップする。
- 案件管理に登録されたメールアドレスを元に、メールワイズ連携等でメールの一括送信を行う。
- 顧客からの依頼により、普段とは異なるメールアドレスに連絡する場合がある。  
  -> ルックアップ先フィールドメールアドレスフィールドを編集可能にする。

## ファイル構成
- `base/Util.js`: フィールドコード等を保存
- `App/LookupEditable.js`: ルックアップ先フィールドを編集可能に
- `App/Init.js`: イベントハンドラーを登録

## ポイント
- サブテーブルのカスタマイズを行う場合は、行追加/削除時のイベントハンドラーを登録する。

```javascript
kintone.events.on([
  'app.record.create.show',
  'app.record.edit.show',
  'app.record.create.show' + example.PROJECT.APP.TO_MAIL_ADDRESS_TABLE.CODE,
  'app.record.edit.show' + example.PROJECT.APP.TO_MAIL_ADDRESS_TABLE.CODE
], function(event) {
  /...
});
```

- サブテーブルのフィールド情報は、他フィールドとは構成が異なるため注意する。  
  フィールドの値は`record.FIELD_CODE.value`ではなく、  
  `record.TABLE_FIELD_CODE.value[i].value.ITEM_FIELD_CODE.value`となる。

```js
{
  "record": {
    // レコードID (通常のフィールド)
    "$id": {
      "type": "__ID__",
      "value": "1"
    },
    // ...
    // サブテーブル
    "メール送信先": {
      "type": "SUBTABLE",
      "value": [
        {
          "id": "3172668",
          "value": {
            "顧客名": {
              "type": "SINGLE_LINE_TEXT",
              "value": "加藤美咲"
            },
            "メール送信先メールアドレス": {
              "type": "SINGLE_LINE_TEXT",
              "value": "kato@example.com"
            }
          }
        }
      ]
    }
  }
  }
```