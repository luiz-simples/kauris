'use strict';

var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var pathSupport = '../../../support/';
var support = require(pathSupport.concat('support'));
require(pathSupport.concat('dont.mock.default.fields'));

var pathSrc                = '../../../../src/';
var pathFormFieldText      = pathSrc.concat('form/fields/FormFieldText');
var pathValidationRequired = pathSrc.concat('form/fields/validations/ValidationRequired');

var FormFieldText      = require(pathFormFieldText);
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
    var text  = support.getText(label);
    expect(text).toEqual(fieldCfg.label);
  });

  it('should call change when filled.', function() {
    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    support.changeText(textArea, newStr);

    expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, newStr]]);
  });

  it('should have class has-success when filled.', function() {
    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    support.changeText(textArea, newStr);

    var classSuccess = 'has-success';
    var container    = field.refs.containerField;
    var hasSuccess   = support.hasClass(container, classSuccess);

    expect(hasSuccess).toBeTruthy();
  });

  it('should have class has-error when empty filled.', function() {
    var validationRequired = new ValidationRequired();
    fieldCfg.validations.push(validationRequired);

    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    support.changeText(textArea, emptyStr);

    var classError = 'has-error';
    var container  = field.refs.containerField;
    var hasError   = support.hasClass(container, classError);

    expect(hasError).toBeTruthy();
  });

  it('should have message error when empty filled.', function() {
    var validationRequired = new ValidationRequired();
    fieldCfg.validations.push(validationRequired);

    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    support.changeText(textArea, emptyStr);

    var msgError = 'This field is required.';
    var msgRef   = field.refs.msgErrorRequired;
    var message  = support.getText(msgRef);
    expect(message).toBe(msgError);
  });

  it('should read only input.', function() {
    fieldCfg.readonly = true;

    var field       = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea    = field.refs.textField;
    var hasReadOnly = support.hasAttr(textArea, 'readonly');

    expect(hasReadOnly).toBeTruthy();
  });

  it('should call change undefined when empty filled.', function() {
    var field    = TestUtils.renderIntoDocument(<FormFieldText field={fieldCfg} />);
    var textArea = field.refs.textField;
    support.changeText(textArea, emptyStr);

    expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, undefined]]);
  });
});
