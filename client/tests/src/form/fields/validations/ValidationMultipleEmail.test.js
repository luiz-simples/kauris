'use strict';

var pathPrototypes = '../../../../../src/Prototypes';
var pathValidationMultipleEmail = '../../../../../src/form/fields/validations/ValidationMultipleEmail';

jest.dontMock(pathPrototypes);
jest.dontMock(pathValidationMultipleEmail);

require(pathPrototypes);
var ValidationMultipleEmail = require(pathValidationMultipleEmail);

describe('ValidationMultipleEmail', function() {
  var validationMultipleEmail, valid, errRejected, errResolved, errorRef;

  beforeEach(function() {
    valid = true;
    errorRef = 'msgErrorMultipleEmail';

    errResolved = function() {
      throw 'Validation not rejected';
    };

    errRejected = function() {
      throw 'Validation not resolved';
    };

    validationMultipleEmail = new ValidationMultipleEmail();
  });

  pit('should resolve when undefined', function() {
    return validationMultipleEmail.verify(undefined).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when empty', function() {
    var empty = '';

    return validationMultipleEmail.verify(empty).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when valid email without point', function() {
    var validEmail = 'luiz@test.com';

    return validationMultipleEmail.verify(validEmail).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when two valid emails without point', function() {
    var validEmail = 'luiz@test.com, henrique@amorim.com';

    return validationMultipleEmail.verify(validEmail).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when valid email with point', function() {
    var validEmail = 'luiz.simples@test.com';

    return validationMultipleEmail.verify(validEmail).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when two valid emails with point', function() {
    var validEmail = 'luiz.simples@test.com,henrique.amorim@test.com';

    return validationMultipleEmail.verify(validEmail).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should rejected when without @', function() {
    var invalidEmail = 'luiz.test.com';

    return validationMultipleEmail.verify(invalidEmail).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: 'This email is invalid: "luiz.test.com"'
      });
    });
  });

  pit('should rejected when one email is inválid', function() {
    var invalidEmail = 'luiz.amorim@test.com,luiz.test.com';

    return validationMultipleEmail.verify(invalidEmail).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: 'This email is invalid: "luiz.test.com"'
      });
    });
  });

  pit('should rejected when without domain', function() {
    var invalidEmail = 'luiz@';

    return validationMultipleEmail.verify(invalidEmail).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: 'This email is invalid: "luiz@"'
      });
    });
  });
});
