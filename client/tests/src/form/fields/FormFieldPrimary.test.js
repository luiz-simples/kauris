'use strict';

var React     = require('react');
var TestUtils = require('react-addons-test-utils');

var pathSupport = '../../../support/';
var support = require(pathSupport.concat('support'));
require(pathSupport.concat('dont.mock.default.fields'));

var pathSrc              = '../../../../src/';
var pathFormFieldPrimary = pathSrc.concat('form/fields/FormFieldPrimary');
var FormFieldPrimary     = require(pathFormFieldPrimary);

describe('FormFieldPrimary', function() {
  var fieldCfg;

  beforeEach(function() {
    var primaryCode = '100';

    fieldCfg = {
      label:  'Form Field Primary',
      place:  'primary code',
      attr:   'fieldAttr',
      value:  primaryCode,
      change: jest.genMockFunction(),
      validations: []
    };
  });

  it('should view label', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldPrimary field={fieldCfg} />);
    var label = support.getText(field.refs.labelField);
    expect(label).toEqual('Form Field Primary');
  });

  it('should view value formated', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldPrimary field={fieldCfg} />);
    var input = field.refs.primaryField;
    expect(input.value).toEqual('000000100');
  });

  it('should read only input.', function() {
    var field = TestUtils.renderIntoDocument(<FormFieldPrimary field={fieldCfg} />);
    var input = field.refs.primaryField;
    var hasReadOnly = support.hasAttr(input, 'readonly');
    expect(hasReadOnly).toBeTruthy();
  });
});
