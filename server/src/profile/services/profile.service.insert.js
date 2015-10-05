'use strict';


var q                    = require('q');
var VerifyEmptyName      = require('../checks/verify.empty.name');
var VerifyRegisteredName = require('../checks/verify.registered.name');

function ProfileServiceInsert(connection) {
  var service = this;
  var verifyEmptyName      = new VerifyEmptyName();
  var verifyRegisteredName = new VerifyRegisteredName(connection);

  service.insert = function(args) {
    var validations = [
      verifyEmptyName(args),
      verifyRegisteredName(args)
    ];

    return q.all(validations).then(function() {
      return args;
    });
  };
}

module.exports = ProfileServiceInsert;
