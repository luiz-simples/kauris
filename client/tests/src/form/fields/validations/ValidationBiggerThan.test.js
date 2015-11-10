'use strict';

var pathPrototypes = '../../../../../src/Prototypes';
var pathValidationBiggerThan = '../../../../../src/form/fields/validations/ValidationBiggerThan';

jest.dontMock(pathPrototypes);
jest.dontMock(pathValidationBiggerThan);

require(pathPrototypes);
var ValidationBiggerThan = require(pathValidationBiggerThan);

describe('ValidationBiggerThan', function() {
  var valid, validationBiggerThan, errRejected, errResolved, errorMessage, errorRef;

  beforeEach(function() {
    valid = true;
    var maxNumber = 100;
    errorRef = 'msgErrorBiggerThan';
    errorMessage = 'This number is bigger than ' + String(maxNumber) + '.';

    errResolved = function() {
      throw 'Validation not rejected';
    };

    errRejected = function() {
      throw 'Validation not resolved';
    };

    validationBiggerThan = new ValidationBiggerThan(maxNumber);
  });

  pit('should resolve when undefined', function() {
    return validationBiggerThan.verify(undefined).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when zero is a string', function() {
    var zeroStr = '0';

    return validationBiggerThan.verify(zeroStr).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when zero is a integer', function() {
    var zeroInt = 0;

    return validationBiggerThan.verify(zeroInt).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should rejected when bigger than 100 int', function() {
    return validationBiggerThan.verify(101).then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });

  pit('should rejected when bigger than 100 str', function() {
    return validationBiggerThan.verify('101').then(errResolved).catch(function(err) {
      expect(err).toEqual({
        ref: errorRef,
        message: errorMessage
      });
    });
  });

  pit('should resolve when less than 100 int', function() {
    return validationBiggerThan.verify(99).then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });

  pit('should resolve when less than 100 str', function() {
    return validationBiggerThan.verify('99').then(function() {
      expect(valid).toBeTruthy();
    }).catch(errRejected);
  });
});
