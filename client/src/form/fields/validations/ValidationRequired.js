'use strict';

var promise = require('q').Promise;

function ValidationRequired() {
  var required = this;
  required.errorName = 'required';

  required.verify = function(value) {
    return promise(function(resolve, reject) {
      var isNumber = !isNaN(parseFloat(value, 10));
      if (isNumber) value = String(value);

      value = String(value || '').trim();
      var isValid = !!value;

      isValid ? resolve() : reject(required.errorName);
    });
  };
}

module.exports = ValidationRequired;
