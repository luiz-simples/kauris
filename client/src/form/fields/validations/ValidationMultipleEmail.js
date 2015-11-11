'use strict';

var promise = require('q').Promise;

function ValidationMultipleEmail() {
  var validation = this;
  var errorRef = 'msgErrorMultipleEmail';

  validation.verify = function(emails) {
    return promise(function(resolve, reject) {
      emails = String(emails || '').trim();
      var filled = emails.length;
      if (!filled) return resolve();
      var mathEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

      emails = emails.split(',').map(function(email) {
        return String(email).trim();
      });

      for (var i = 0, c = emails.length; i < c; i++) {
        var email = emails[i];
        var isInvalid = !mathEmail.test(email);
        if (isInvalid) {
          return reject({ message: errorRef.translate(email), ref: errorRef });
          break;
        }
      }

      resolve();
    });
  };
}

module.exports = ValidationMultipleEmail;
