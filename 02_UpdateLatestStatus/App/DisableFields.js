(function() {
  'use strict';
  example.PROJECT.DisableFields = function() {
    var self = this;
    var util = {
      APP: example.PROJECT.APP
    };
    self.event = null;
    self.TARGET_FIELDS = [
      util.APP.LATEST_DATE.CODE,
      util.APP.LATEST_STATUS.CODE
    ];
    self.init = function(event) {
      self.event = event;
      self.TARGET_FIELDS.forEach(function(code) {
        self.event.record[code].disabled = true;
      });
    };
  };
})();
