'use strict';

function VerifyRegisteredName(injector) {
  var verify = this;

  verify.check = function(args) {
    var promise    = injector.q.Promise;
    var connection = injector.connection;

    return promise(function(resolve, reject) {
      var profileError = 'profile.exist.user';

      var modelFilter = {
        tableName: 'users',
        limit: 1,
        fields: [
          { attr: 'userProfile', kind: 'foreign', value: args.profileId, comparator: '=' }
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
