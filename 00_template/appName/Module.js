(function() {
  'use strict';
  example.PROJECT.Module = function() {
    var self = this;
    var util = {
      APP: example.PROJECT.APP
    };
    self.event = null;
    self.init = function(event) {
      self.event = event;
      var table = util.APP.TABLE;
      self.event.record[table.CODE].value.forEach(function(row) {
        row.value[table.FIELDS.FIELD.CODE].disabled = false;
      });
    };
  };
})();
