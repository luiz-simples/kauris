'use strict';

var promise = require('q').Promise;

function ValidationRequired() {
  var validation = this;
  var errorRef = 'msgErrorRequired';

  validation.verify = function(value) {
    return promise(function(resolve, reject) {
      var isNumber = !isNaN(parseFloat(value, 10));
      if (isNumber) value = String(value);

      value = String(value || '').trim();
      var isValid = !!value;

      isValid
        ? resolve()
        : reject({ message: errorRef.translate(), ref: errorRef });
    });
  };
}

module.exports = ValidationRequired;
