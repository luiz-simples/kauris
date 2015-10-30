'use strict';

var pathFormFieldString = '../../../../src/form/fields/FormFieldString';

jest.dontMock(pathFormFieldString);

var React           = require('react');
var ReactDOM        = require('react-dom');
var TestUtils       = require('react-addons-test-utils');
var FormFieldString = require(pathFormFieldString);

var findElement = ReactDOM.findDOMNode;
var changeValue = function(element, text) {
  TestUtils.Simulate.change(element, {target: {value: text }});
};

var hasClass = function(ref, className) {
  var element = findElement(ref);
  var list    = element.classList;

  return Object.keys(list).map(function(key) {
    return list[key];
  }).indexOf(className) > -1;
};

var hasAttr = function(ref, attr) {
  var element = findElement(ref);
  return element.hasAttribute(attr);
};

var changeText = function(ref, text) {
  var reference = findElement(ref);
  changeValue(reference, text);
};

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
      change: jest.genMockFunction()
    };
  });

  it('should view label and filled', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg}/>);
    var label = findElement(field.refs.labelField);
    expect(label.textContent).toEqual('Form Field String');
  });

  it('should call change when filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg}/>);
    var input = field.refs.inputField;
    changeText(input, newStr);

    expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, newStr]]);
  });

  it('should has-success when filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg}/>);
    var input = field.refs.inputField;
    changeText(input, newStr);

    var classSuccess = 'has-success';
    var container    = field.refs.containerField;
    var hasSuccess   = hasClass(container, classSuccess);

    expect(hasSuccess).toBeTruthy();
  });

  it('should has-error when empty filled.', function() {
    fieldCfg.required = true;
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg}/>);
    var input = field.refs.inputField;
    changeText(input, emptyStr);

    var classError = 'has-error';
    var container  = field.refs.containerField;
    var hasError   = hasClass(container, classError);

    expect(hasError).toBeTruthy();
  });

  it('should read only input.', function() {
    fieldCfg.readonly = true;
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg}/>);
    var input = field.refs.inputField;
    var hasReadOnly = hasAttr(input, 'readonly');
    expect(hasReadOnly).toBeTruthy();
  });

  it('should call change undefined when empty filled.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldString field={fieldCfg}/>);
    var input = field.refs.inputField;
    changeText(input, emptyStr);

    expect(fieldCfg.change.mock.calls).toEqual([[fieldCfg, undefined]]);
  });
});
