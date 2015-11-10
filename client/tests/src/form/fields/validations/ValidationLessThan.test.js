'use strict';

var pathPrototypes = '../../../../../src/Prototypes';
var pathValidationLessThan = '../../../../../src/form/fields/validations/ValidationLessThan';

jest.dontMock(pathPrototypes);
jest.dontMock(pathValidationLessThan);

require(pathPrototypes);
var ValidationLessThan = require(pathValidationLessThan);

describe('ValidationLessThan', function() {
  var valid, validationLessThan, errRejected, errResolved, errorMessage, errorRef;

  beforeEach(function() {
    valid = true;
    var minNumber = 100;
    errorRef = 'msgErrorLessThan';
    errorMessage = 'This number is less than ' + String(minNumber) + '.';

    errResolved = function() {
      throw 'Validation not rejected';
    };

    errRejected = function() {
      throw 'Validation not resolved';
    };

    validationLessThan = new ValidationLessThan(minNumber);
  });

  pit('should resolve when undefined', function() {
    return validationLessThan.verify(undefined).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should rejected when less than 100 int', function() {
    return validationLessThan.verify(99).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });

  pit('should rejected when less than 100 str', function() {
    return validationLessThan.verify('99').then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });

  pit('should resolve when bigger than 100 int', function() {
    return validationLessThan.verify(101).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when bigger than 100 str', function() {
    return validationLessThan.verify('101').then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });
});
