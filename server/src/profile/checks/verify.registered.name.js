'use strict';

function VerifyRegisteredName(injector) {
  var verify = this;

  verify.check = function(args) {
    var promise    = injector.q.Promise;
    var connection = injector.connection;

    return promise(function(resolve, reject) {
      var profileName  = 'profileName';
      var profileError = 'profile.name.registered';

      var modelFilter = {
        tableName: 'profile',
        limit: 1,
        fields: [
          { attr: profileName, kind: 'name', value: args.profileName, comparator: 'like' }
        ]
      };

      connection.searchByModel(modelFilter).then(function(resultSet) {
        if (resultSet.count) return reject(profileError);
        resolve(args);
      }).catch(reject);
    });
  };
}

module.exports = VerifyRegisteredName;
