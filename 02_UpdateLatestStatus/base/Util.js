/* eslint block-scoped-var: 0 */
/* eslint no-use-before-define: 0 */

if (!example) {
  var example = {};
}

example.PROJECT = {
  CONSTANT: {
    STATUS: {
      PROCEEDING: '対応中',
      ORDERED: '受注',
      FAILED: '失注'
    }
  },
  APPS: {
    APP: {
      ID: 1665
    }
  },
  APP: {
    LATEST_DATE: {
      CODE: '案件履歴更新日付'
    },
    LATEST_STATUS: {
      CODE: '最新状態'
    },
    CASE_HISTORY: {
      CODE: '案件履歴',
      FIELDS: {
        DATE: {
          CODE: '日付'
        },
        STATUS: {
          CODE: '状態'
        }
      }
    }
  },
  FUNCTION: {
    getPriority: function(status) {
      'use strict';
      return [
        status.ORDERED,
        status.PROCEEDING,
        status.FAILED
      ];
    }
  }
};
