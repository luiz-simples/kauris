'use strict';

var TestUtils = require('react-addons-test-utils');

function KeyDown(element, keyPress) {
  TestUtils.Simulate.keyDown(element, keyPress);
  TestUtils.Simulate.change(element);
}

module.exports = KeyDown;
