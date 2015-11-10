'use strict';

var promise = require('q').Promise;

function ValidationLessThan(minNumber) {
  var validation = this;
  var errorRef = 'msgErrorLessThan';

  validation.verify = function(value) {
    return promise(function(resolve, reject) {
      if (value === undefined) return resolve();
      var isNotNumber = isNaN(parseFloat(value, 10));
      if (isNotNumber) return resolve();
      value = parseFloat(value, 10);

      var isLessThan = value < minNumber;

      isLessThan
        ? reject({ message: errorRef.translate(minNumber), ref: errorRef })
        : resolve();
    });
  };
}

module.exports = ValidationLessThan;
