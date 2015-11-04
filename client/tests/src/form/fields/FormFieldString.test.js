'use strict';

var pathPrototypes         = '../../../../src/Prototypes';
var pathFormFieldString    = '../../../../src/form/fields/FormFieldString';
var pathValidationMessage  = '../../../../src/form/fields/validations/ValidationMessage';
var pathValidationRequired = '../../../../src/form/fields/validations/ValidationRequired';

jest.dontMock(pathPrototypes);
jest.dontMock(pathFormFieldString);
jest.dontMock(pathValidationMessage);
jest.dontMock(pathValidationRequired);

var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var FormFieldString    = require(pathFormFieldString);
var ValidationRequired = require(pathValidationRequired);

var pathSupport = '../../../support/';
var hasAttr     = require(pathSupport.concat('has.attr'));
var hasClass    = require(pathSupport.concat('has.class'));
var changeText  = require(pathSupport.concat('change.text'));
var getText     = require(pathSupport.concat('get.text'));

describe('FormFieldString', function() {
  var fieldCfg, emptyStr, newStr;

  beforeEach(function() {
    newStr   = 'new value';
    emptyStr = '';

    fieldCfg = {
      label:  'Form Field String',
      place:  'write here a string',
      attr:   'fieldAttr',
      value:  emptyStr,
      change: jest.genMockFunction(),
      validations: []
    };
  });

  it('should view label and filled', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var label = getText(field.refs.labelField);
    expect(label).toEqual('Form Field String');
  });

  it('should call change when filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    changeText(input, newStr);

    expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, newStr]]);
  });

  it('should have class has-success when filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    changeText(input, newStr);

    var classSuccess = 'has-success';
    var container    = field.refs.containerField;
    var hasSuccess   = hasClass(container, classSuccess);

    expect(hasSuccess).toBeTruthy();
  });

  it('should have class has-error when empty filled.', function() {
    var validationRequired = new ValidationRequired();
    fieldCfg.validations.push(validationRequired);

    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    changeText(input, emptyStr);

    var classError = 'has-error';
    var container  = field.refs.containerField;
    var hasError   = hasClass(container, classError);

    expect(hasError).toBeTruthy();
  });

  it('should have message error when empty filled.', function() {
    var validationRequired = new ValidationRequired();
    fieldCfg.validations.push(validationRequired);

    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    changeText(input, emptyStr);

    var msgError = 'This field is required.';
    var msgRef   = field.refs.msgErrorRequired;
    var message  = getText(msgRef);

    expect(message).toBe(msgError);
  });

  it('should read only input.', function() {
    fieldCfg.readonly = true;
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    var hasReadOnly = hasAttr(input, 'readonly');
    expect(hasReadOnly).toBeTruthy();
  });

  it('should call change undefined when empty filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    changeText(input, emptyStr);

    expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, undefined]]);
  });
});
