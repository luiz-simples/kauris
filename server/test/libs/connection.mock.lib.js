'use strict';

var q = require('q');

function ConnectionMockLib() {
  var mockLib = this;

  mockLib.make = function(rows, callMethod) {
    if (!rows) rows = [];

    return q.Promise(function(resolve) {
      resolve({
        search: function(args) {
          return q.Promise(function(resolve) {
            if (callMethod) callMethod(args);

            resolve({ count: rows.length, data: rows });
          });
        }
      });
    });
  };
}

module.exports = ConnectionMockLib;
