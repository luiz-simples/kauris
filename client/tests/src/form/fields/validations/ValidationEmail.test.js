'use strict';

var pathPrototypes = '../../../../../src/Prototypes';
var pathValidationEmail = '../../../../../src/form/fields/validations/ValidationEmail';

jest.dontMock(pathPrototypes);
jest.dontMock(pathValidationEmail);

require(pathPrototypes);
var ValidationEmail = require(pathValidationEmail);

describe('ValidationEmail', function() {
  var valid, validationEmail, errRejected, errResolved, errorMessage, errorRef;

  beforeEach(function() {
    valid = true;
    errorRef = 'msgErrorEmail';
    errorMessage = 'This email is invalid.';

    errResolved = function() {
      throw 'Validation not rejected';
    };

    errRejected = function() {
      throw 'Validation not resolved';
    };

    validationEmail = new ValidationEmail();
  });

  pit('should resolve when undefined', function() {
    return validationEmail.verify(undefined).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when empty', function() {
    var empty = '';

    return validationEmail.verify(empty).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when valid email without point', function() {
    var validEmail = 'luiz@test.com';

    return validationEmail.verify(validEmail).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when valid email with point', function() {
    var validEmail = 'luiz.simples@test.com';

    return validationEmail.verify(validEmail).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should rejected when without @', function() {
    var invalidEmail = 'luiz.test.com';

    return validationEmail.verify(invalidEmail).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });

  pit('should rejected when without domain', function() {
    var invalidEmail = 'luiz@';

    return validationEmail.verify(invalidEmail).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });
});
