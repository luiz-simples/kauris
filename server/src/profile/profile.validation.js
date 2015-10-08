'use strict';

function ProfileValidation(injector) {
  var service = this;

  service.beforeSave = function(profileArgs) {
    var runPromises          = injector.q.all;
    var VerifyEmptyName      = injector.VerifyEmptyName;
    var VerifyRegisteredName = injector.VerifyRegisteredName;

    var verifyEmptyName      = new VerifyEmptyName(injector);
    var verifyRegisteredName = new VerifyRegisteredName(injector);

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
    var VerifyExistUser = injector.VerifyExistUser;
    var verifyExistUser = new VerifyExistUser(injector);

    var validations = [
      verifyExistUser.check(profileArgs)
    ];

    return runPromises(validations).then(function() {
      return profileArgs;
    });
  };
}

module.exports = ProfileValidation;
