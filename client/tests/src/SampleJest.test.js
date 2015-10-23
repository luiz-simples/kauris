/*globals jest:false, expect:false */
'use strict';

var pathSampleJest = '../../src/SampleJest';
jest.dontMock(pathSampleJest);

describe('CheckboxWithLabel', function() {
  it('changes the text after click', function() {
    var TestUtils = require('react-addons-test-utils');
    var ReactDOM = require('react-dom');
    var React = require('react');
    var CheckboxWithLabel = require(pathSampleJest);

    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'label');
    expect(ReactDOM.findDOMNode(label).textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'input');
    TestUtils.Simulate.change(input);
    expect(ReactDOM.findDOMNode(label).textContent).toEqual('On');
  });
});
