'use strict';

function VerifyEmptyName(injector) {
  var verify = this;

  verify.check = function(args) {
    var promise = injector.q.Promise;

    return promise(function(resolve, reject) {
      var profileName  = 'profileName';
      var profileError = 'profile.name.empty';
      var nameString   = String(args.hasOwnProperty(profileName) && args[profileName] ? args.profileName : '').trim();
      var nameEmpty    = !nameString.length;

      if (nameEmpty) return reject(profileError);
      resolve(args);
    });
  };
}

module.exports = VerifyEmptyName;
