'use strict';

var promise = require('q').Promise;

function ValidationBiggerThan(maxNumber) {
  var validation = this;
  var errorRef = 'msgErrorBiggerThan';

  validation.verify = function(value) {
    return promise(function(resolve, reject) {
      if (value === undefined) return resolve();
      var isNotNumber = isNaN(parseFloat(value, 10));
      if (isNotNumber) return resolve();
      value = parseFloat(value, 10);

      var isBiggerThan = value > maxNumber;

      isBiggerThan
        ? reject({ message: errorRef.translate(maxNumber), ref: errorRef })
        : resolve();
    });
  };
}

module.exports = ValidationBiggerThan;
