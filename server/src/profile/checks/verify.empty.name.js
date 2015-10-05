'use strict';

var q = require('q');

function VerifyEmptyName() {
  return function(args) {
    return q.Promise(function(resolve, reject) {
      var profileName      = 'profileName';
      var profileNameEmpty = 'profile.name.empty';
      var nameString       = String(args.hasOwnProperty(profileName) && args[profileName] ? args.profileName : '').trim();
      var nameEmpty        = !nameString.length;

      if (nameEmpty) return reject(profileNameEmpty);
      resolve(args);
    });
  };
}

module.exports = VerifyEmptyName;
