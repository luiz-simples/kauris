'use strict';

var promise = require('q').Promise;

function ValidationEmail() {
  var validation = this;
  var errorRef = 'msgErrorEmail';

  validation.verify = function(email) {
    return promise(function(resolve, reject) {
      email = String(email || '').trim();
      var filled = email.length;
      if (!filled) return resolve();

      var mathEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

      var isValid = mathEmail.test(email);

      isValid
        ? resolve()
        : reject({ message: errorRef.translate(), ref: errorRef });
    });
  };
}

module.exports = ValidationEmail;
