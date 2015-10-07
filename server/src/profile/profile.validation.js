'use strict';

function ProfileValidation(injector) {
  var service = this;

  service.beforeSave = function(profileArgs) {
    var runPromises          = injector.q.all;
    var verifyEmptyName      = injector.verifyEmptyName;
    var verifyRegisteredName = injector.verifyRegisteredName;

    var validations = [
      verifyEmptyName.check(profileArgs),
      verifyRegisteredName.check(profileArgs)
    ];

    return runPromises(validations).then(function() {
      return profileArgs;
    });
  };

  service.beforeDelete = function(profileArgs) {
    var runPromises     = injector.q.all;
    var verifyExistUser = injector.verifyExistUser;

    var validations = [
      verifyExistUser.check(profileArgs)
    ];

    return runPromises(validations).then(function() {
      return profileArgs;
    });
  };
}

module.exports = ProfileValidation;
