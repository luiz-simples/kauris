'use strict';

var pathPrototypes = '../../../../../src/Prototypes';
var pathValidationRequired = '../../../../../src/form/fields/validations/ValidationRequired';

jest.dontMock(pathPrototypes);
jest.dontMock(pathValidationRequired);

require(pathPrototypes);
var ValidationRequired = require(pathValidationRequired);

describe('ValidationRequired', function() {
  var validationRequired, errResolved, errRejected, errorMessage, errorRef;

  beforeEach(function() {
    errorRef = 'msgErrorRequired';
    errorMessage = 'This field is required.';

    errResolved = function() {
      throw 'Validation not rejected';
    };

    errRejected = function(e) {
      throw e;
    };

    validationRequired = new ValidationRequired();
  });

  pit('should reject when undefined', function() {
    var empty = undefined;

    return validationRequired.verify(empty).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });

  pit('should reject when empty', function() {
    var empty = '';

    return validationRequired.verify(empty).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });

  pit('should reject when empty spaces', function() {
    var empty = '      ';

    return validationRequired.verify(empty).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });

  pit('should resolve when zero is a string', function() {
    var zero = '0';
    var valid = true;

    return validationRequired.verify(zero).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when zero is a integer', function() {
    var zero = 0;
    var valid = true;

    return validationRequired.verify(zero).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });
});
