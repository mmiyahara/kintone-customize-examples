(function() {
  'use strict';

  kintone.events.on([
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.index.edit.show'
  ], function(event) {
    var disableFields = new example.PROJECT.DisableFields();
    disableFields.init(event);
    return event;
  });

  kintone.events.on([
    'app.record.create.submit',
    'app.record.edit.submit',
    'app.record.index.edit.submit'
  ], function(event) {
    var updateLatestStatus = new example.PROJECT.UpdateLatestStatus();
    updateLatestStatus.init(event);
    return event;
  });
})();
