(function() {
  'use strict';
  example.PROJECT.LookupEditable = function() {
    var self = this;
    var util = {
      APP: example.PROJECT.APP
    };
    self.event = null;
    self.init = function(event) {
      self.event = event;
      var table = util.APP.TO_MAIL_ADDRESS_TABLE;
      self.event.record[table.CODE].value.forEach(function(row) {
        row.value[table.FIELDS.MAIL_ADDRESS.CODE].disabled = false;
      });
    };
  };
})();
