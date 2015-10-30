'use strict';

var pathValidationRequired = '../../../../../src/form/fields/validations/ValidationRequired';
jest.dontMock(pathValidationRequired);
var ValidationRequired = require(pathValidationRequired);

describe('validationRequired', function() {
  var validationRequired;

  beforeEach(function() {
    validationRequired = new ValidationRequired();
  });

  it('should return error name', function() {
    var errorName = validationRequired.errorName;
    expect(errorName).toBe('required');
  });

  it('should return false when empty', function() {
    var empty = '';
    var valid = validationRequired.verify(empty);
    expect(valid).toBeFalsy();
  });

  it('should return false when empty spaces', function() {
    var empty = '      ';
    var valid = validationRequired.verify(empty);
    expect(valid).toBeFalsy();
  });

  it('should return false when undefined', function() {
    var valid = validationRequired.verify(undefined);
    expect(valid).toBeFalsy();
  });

  it('should return true when zero', function() {
    var empty = '0';
    var valid = validationRequired.verify(empty);
    expect(valid).toBeTruthy();
  });

  it('should return true when zero', function() {
    var empty = 0;
    var valid = validationRequired.verify(empty);
    expect(valid).toBeTruthy();
  });
});
