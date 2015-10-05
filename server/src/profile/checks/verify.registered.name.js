'use strict';

var q = require('q');

function VerifyRegisteredName(connection) {
  return function(args) {
    return q.Promise(function(resolve, reject) {
      var profileName           = 'profileName';
      var profileNameRegistered = 'profile.name.registered';

      var modelFilter = {
        tableName: 'profile',
        limit: 1,
        fields: [
          { attr: profileName, kind: 'name', value: args.profileName, comparator: 'like' }
        ]
      };

      connection.searchByModel(modelFilter).then(function(resultSet) {
        if (resultSet.count) return reject(profileNameRegistered);
        resolve(args);
      }).catch(reject);
    });
  };
}

module.exports = VerifyRegisteredName;
