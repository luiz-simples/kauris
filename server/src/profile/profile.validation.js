'use strict';

function ProfileValidation(injector) {
  var service = this;

  service.beforeSave = function(args) {
    var runPromises          = injector.q.all;
    var verifyEmptyName      = injector.verifyEmptyName;
    var verifyRegisteredName = injector.verifyRegisteredName;

    var validations = [
      verifyEmptyName.check(args),
      verifyRegisteredName.check(args)
    ];

    return runPromises(validations).then(function() {
      return args;
    });
  };
}

module.exports = ProfileValidation;
