'use strict';

var TestUtils = require('react-addons-test-utils');

function ChangeValue(element, text) {
  TestUtils.Simulate.change(element, {target: {value: text }});
}

module.exports = ChangeValue;
