'use strict';

function VerifyRegisteredName(injector) {
  var verify = this;

  verify.check = function(args) {
    var promise    = injector.q.Promise;
    var connection = injector.connection;
    var UserModel  = injector.UserModel;
    console.log(UserModel);
    var userSearch = new UserModel();

    return promise(function(resolve, reject) {
      var profileError = 'profile.exist.user';

      userSearch.fields = [{ attr: 'userId',      kind: 'primary' }];
      userSearch.where  = [{ attr: 'userProfile', kind: 'foreign', value: args.profileId, comparator: '=' }];
      userSearch.limit  = 1;

      connection.search(userSearch).then(function(resultSet) {
        if (resultSet.count) return reject(profileError);
        resolve(args);
      }).catch(reject);
    });
  };
}

module.exports = VerifyRegisteredName;
