'use strict';

function VerifyRegisteredName(injector) {
  var verify = this;

  verify.check = function(args) {
    var promise       = injector.q.Promise;
    var connection    = injector.connection;
    var ProfileModel  = injector.ProfileModel;
    var profileSearch = new ProfileModel();

    return promise(function(resolve, reject) {
      var profileError = 'profile.name.registered';

      profileSearch.fields = [{ attr: 'profileId',   kind: 'primary' }];
      profileSearch.where  = [{ attr: 'profileName', kind: 'foreign', value: args.profileName, comparator: 'like' }];
      profileSearch.limit  = 1;

      connection.searchByModel(profileSearch).then(function(resultSet) {
        if (resultSet.count) return reject(profileError);
        resolve(args);
      }).catch(reject);
    });
  };
}

module.exports = VerifyRegisteredName;
