'use strict';

var q = require('q');

function ProfileInserValidations() {
  var service = this;

  service.verify = function(profileArgs) {
    return q.Promise(function(resolve, reject) {
      var errors           = [];
      var profileName      = 'profileName';
      var nameString       = String(profileArgs.hasOwnProperty(profileName) && profileArgs[profileName] ? profileArgs.profileName : '').trim();
      var nameEmpty        = !nameString.length;
      var profileNameEmpty = 'profile.name.empty';
      if (nameEmpty) errors.push(profileNameEmpty);

      var existError = errors.length;
      if (existError) return reject(errors);
      profileArgs[profileName] = nameString;
      resolve(profileArgs);
    });
  };
}

module.exports = ProfileInserValidations;
