'use strict';

var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var pathSupport = '../../../support/';
var support = require(pathSupport.concat('support'));
require(pathSupport.concat('dont.mock.default.fields'));

var pathSrc                = '../../../../src/';
var pathFormFieldInteger   = pathSrc.concat('form/fields/FormFieldInteger');
var pathValidationRequired = pathSrc.concat('form/fields/validations/ValidationRequired');

var FormFieldInteger   = require(pathFormFieldInteger);
var ValidationRequired = require(pathValidationRequired);

describe('FormFieldInteger', function() {
  var fieldCfg, emptyInt, newInt;

  beforeEach(function() {
    newInt   = '321654987';
    emptyInt = '';

    fieldCfg = {
      label:  'Form Field Integer',
      place:  'write here a integer',
      attr:   'fieldAttr',
      value:  emptyInt,
      change: jest.genMockFunction(),
      validations: []
    };
  });

  it('should view label and filled', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldInteger field={fieldCfg} />);
    var label = support.getText(field.refs.labelField);
    expect(label).toEqual('Form Field Integer');
  });

  it('should call change when filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldInteger field={fieldCfg} />);
    var input = field.refs.integerField;
    support.changeText(input, newInt);

    setTimeout(function() {
      expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, newInt]]);
    });
  });

  it('should have class has-success when filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldInteger field={fieldCfg} />);
    var input = field.refs.integerField;
    support.changeText(input, newInt);

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

    var field = TestUtils.renderIntoDocument(<FormFieldInteger field={fieldCfg} />);
    var input = field.refs.integerField;
    support.changeText(input, emptyInt);

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

    var field = TestUtils.renderIntoDocument(<FormFieldInteger field={fieldCfg} />);
    var input = field.refs.integerField;
    support.changeText(input, emptyInt);

    setTimeout(function() {
      var msgError = 'This field is required.';
      var msgRef   = field.refs.msgErrorRequired;
      var message  = support.getText(msgRef);
      expect(message).toBe(msgError);
    });
  });

  it('should read only input.', function() {
    fieldCfg.readonly = true;
    var field = TestUtils.renderIntoDocument(<FormFieldInteger field={fieldCfg} />);
    var input = field.refs.integerField;
    var hasReadOnly = support.hasAttr(input, 'readonly');
    expect(hasReadOnly).toBeTruthy();
  });

  it('should call change undefined when empty filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldInteger field={fieldCfg} />);
    var input = field.refs.integerField;
    support.changeText(input, emptyInt);

    setTimeout(function() {
      expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, undefined]]);
    });
  });
});
