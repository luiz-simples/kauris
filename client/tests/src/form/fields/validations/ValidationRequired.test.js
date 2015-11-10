'use strict';

var pathValidationRequired = '../../../../../src/form/fields/validations/ValidationRequired';
jest.dontMock(pathValidationRequired);
var ValidationRequired = require(pathValidationRequired);

describe('validationRequired', function() {
  var validationRequired, errResolved, errRejected, errorName;

  beforeEach(function() {
    errorName = 'required';

    errResolved = function() {
      throw 'Validation not rejected';
    };

    errRejected = function(e) {
      throw e;
    };

    validationRequired = new ValidationRequired();
  });

  pit('should return error name', function() {
    var empty = '';

    return validationRequired.verify(empty).then(errResolved).catch(function(err) {
      expect(err).toBe(errorName);
    });
  });

  pit('should return false when empty', function() {
    var empty = '';

    return validationRequired.verify(empty).then(errResolved).catch(function(err) {
      expect(err).toBe(errorName);
    });
  });

  pit('should return false when empty spaces', function() {
    var empty = '      ';

    return validationRequired.verify(empty).then(errResolved).catch(function(err) {
      expect(err).toBe(errorName);
    });
  });

  pit('should return false when undefined', function() {
    return validationRequired.verify(undefined).then(errResolved).catch(function(err) {
      expect(err).toBe(errorName);
    });
  });

  pit('should return true when zero is a string', function() {
    var zero = '0';
    var valid = true;

    return validationRequired.verify(zero).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should return true when zero is a integer', function() {
    var zero = 0;
    var valid = true;

    return validationRequired.verify(zero).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });
});
