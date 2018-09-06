(function() {
  'use strict';
  example.PROJECT.UpdateLatestStatus = function() {
    var self = this;
    var util = {
      APP: example.PROJECT.APP,
      CONST: example.PROJECT.CONSTANT,
      FUNC: example.PROJECT.FUNCTION
    };
    self.priority = util.FUNC.getPriority(util.CONST.STATUS);
    self.event = null;
    self.init = function(event) {
      self.event = event;
      var TABLE_CODE = util.APP.CASE_HISTORY.CODE;
      var tableRows = self.event.record[TABLE_CODE].value;
      var latestRow = self.getLatestRow(tableRows);
      self.event.record[util.APP.LATEST_DATE.CODE].value = latestRow.date;
      self.event.record[util.APP.LATEST_STATUS.CODE].value = latestRow.status;
    };
    self.getLatestRow = function(tableRows) {
      var ITEM_DATE_CODE = util.APP.CASE_HISTORY.FIELDS.DATE.CODE;
      var ITEM_STATUS_CODE = util.APP.CASE_HISTORY.FIELDS.STATUS.CODE;

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
    };
  };
})();
