'use strict';

var pathPrototypes         = '../../../../src/Prototypes';
var pathFormFieldText      = '../../../../src/form/fields/FormFieldText';
var pathValidationMessage  = '../../../../src/form/fields/validations/ValidationMessage';
var pathValidationRequired = '../../../../src/form/fields/validations/ValidationRequired';

jest.dontMock(pathPrototypes);
jest.dontMock(pathFormFieldText);
jest.dontMock(pathValidationMessage);
jest.dontMock(pathValidationRequired);

var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var pathSupport = '../../../support/';
var hasAttr     = require(pathSupport.concat('has.attr'));
var hasClass    = require(pathSupport.concat('has.class'));
var changeText  = require(pathSupport.concat('change.text'));
var getText     = require(pathSupport.concat('get.text'));

var FormFieldText = require(pathFormFieldText);
var ValidationRequired = require(pathValidationRequired);

describe('FormFieldText', function() {
  var fieldCfg, emptyStr, newStr;

  beforeEach(function() {
    newStr   = 'new value';
    emptyStr = '';

    fieldCfg = {
      label:  'Form Field Text',
      place:  'write here a text',
      attr:   'fieldAttr',
      value:  emptyStr,
      change: jest.genMockFunction(),
      validations: []
    };
  });

  it('should view label and filled', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var label = field.refs.labelField;
    var text  = getText(label);
    expect(text).toEqual(fieldCfg.label);
  });

  it('should call change when filled.', function() {
    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    changeText(textArea, newStr);

    expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, newStr]]);
  });

  it('should have class has-success when filled.', function() {
    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    changeText(textArea, newStr);

    var classSuccess = 'has-success';
    var container    = field.refs.containerField;
    var hasSuccess   = hasClass(container, classSuccess);

    expect(hasSuccess).toBeTruthy();
  });

  it('should have class has-error when empty filled.', function() {
    var validationRequired = new ValidationRequired();
    fieldCfg.validations.push(validationRequired);

    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    changeText(textArea, emptyStr);

    var classError = 'has-error';
    var container  = field.refs.containerField;
    var hasError   = hasClass(container, classError);

    expect(hasError).toBeTruthy();
  });

  it('should have message error when empty filled.', function() {
    var validationRequired = new ValidationRequired();
    fieldCfg.validations.push(validationRequired);

    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    changeText(textArea, emptyStr);

    var msgError = 'This field is required.';
    var msgRef   = field.refs.msgErrorRequired;
    var message  = getText(msgRef);
    expect(message).toBe(msgError);
  });

  it('should read only input.', function() {
    fieldCfg.readonly = true;
    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    var hasReadOnly = hasAttr(textArea, 'readonly');
    expect(hasReadOnly).toBeTruthy();
  });

  it('should call change undefined when empty filled.', function() {
    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    changeText(textArea, emptyStr);

    expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, undefined]]);
  });
});
