'use strict';

function ValidationRequired() {
  var required = this;
  required.errorName = 'required';

  required.verify = function(value) {
    var isNumber = !isNaN(parseFloat(value, 10));
    if (isNumber) value = String(value);

    value = String(value || '').trim();
    var isValid = !!value;

    return isValid;
  };
}

module.exports = ValidationRequired;
