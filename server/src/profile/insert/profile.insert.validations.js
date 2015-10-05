'use strict';

var q = require('q');

function ProfileInserValidations(connection) {
  var service = this;

  service.verify = function(profileArgs) {
    return q.Promise(function(resolve, reject) {
      var profileName           = 'profileName';
      var nameString            = String(profileArgs.hasOwnProperty(profileName) && profileArgs[profileName] ? profileArgs.profileName : '').trim();
      var nameEmpty             = !nameString.length;
      var profileNameEmpty      = 'profile.name.empty';
      var profileNameRegistered = 'profile.name.registered';
      profileArgs[profileName]  = nameString;

      if (nameEmpty) return reject([profileNameEmpty]);

      var modelFilter = {
        tableName: 'profile',
        limit: 1,
        fields: [
          { attr: 'profileName', kind: 'name', value: nameString, comparator: 'like' }
        ]
      };

      connection.searchByModel(modelFilter).then(function(resultSet) {
        if (resultSet.count) throw [profileNameRegistered];
        return profileArgs;
      }).then(resolve).catch(reject);
    });
  };
}

module.exports = ProfileInserValidations;
