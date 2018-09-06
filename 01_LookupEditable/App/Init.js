(function() {
  'use strict';

  kintone.events.on([
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.create.show' + example.PROJECT.APP.TO_MAIL_ADDRESS_TABLE.CODE,
    'app.record.edit.show' + example.PROJECT.APP.TO_MAIL_ADDRESS_TABLE.CODE
  ], function(event) {
    var lookupEditable = new example.PROJECT.LookupEditable();
    lookupEditable.init(event);
    return event;
  });
})();
