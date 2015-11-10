'use strict';

var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var pathSupport = '../../../support/';
var support = require(pathSupport.concat('support'));
require(pathSupport.concat('dont.mock.default.fields'));

var pathSrc                = '../../../../src/';
var pathFormFieldString    = pathSrc.concat('form/fields/FormFieldString');
var pathValidationRequired = pathSrc.concat('form/fields/validations/ValidationRequired');

var FormFieldString    = require(pathFormFieldString);
var ValidationRequired = require(pathValidationRequired);

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

  it('should view label', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var label = support.getText(field.refs.labelField);
    expect(label).toEqual('Form Field String');
  });

  it('should call change when filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    support.changeText(input, newStr);

    setTimeout(function() {
      expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, newStr]]);
    });
  });

  it('should have class has-success when filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    support.changeText(input, newStr);

    setTimeout(function() {
      var classSuccess = 'has-success';
      var container    = field.refs.containerField;
      var hasSuccess   = support.hasClass(container, classSuccess);
      expect(hasSuccess).toBeTruthy();
    });
  });

  it('should have class has-error when empty filled.', function() {
    var validationRequired = new ValidationRequired();
    fieldCfg.validations.push(validationRequired);

    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    support.changeText(input, emptyStr);

    setTimeout(function() {
      var classError = 'has-error';
      var container  = field.refs.containerField;
      var hasError   = support.hasClass(container, classError);
      expect(hasError).toBeTruthy();
    });
  });

  it('should have message error when empty filled.', function() {
    var validationRequired = new ValidationRequired();
    fieldCfg.validations.push(validationRequired);

    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    support.changeText(input, emptyStr);

    setTimeout(function() {
      var msgError = 'This field is required.';
      var msgRef   = field.refs.msgErrorRequired;
      var message  = support.getText(msgRef);
      expect(message).toBe(msgError);
    });
  });

  it('should read only input.', function() {
    fieldCfg.readonly = true;
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    var hasReadOnly = support.hasAttr(input, 'readonly');
    expect(hasReadOnly).toBeTruthy();
  });

  it('should call change undefined when empty filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg} />);
    var input = field.refs.stringField;
    support.changeText(input, emptyStr);

    setTimeout(function() {
      expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, undefined]]);
    });
  });
});
