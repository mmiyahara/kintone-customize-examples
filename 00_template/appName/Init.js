(function() {
  'use strict';

  kintone.events.on([
    'app.record.create.show'
  ], function(event) {
    return event;
  });
})();
