'use strict';

var TestUtils = require('react-addons-test-utils');

function KeyDown(element, keyPress) {
  console.log(keyPress, '-----------');
  TestUtils.Simulate.keyDown(element, keyPress);
  TestUtils.Simulate.change(element);
}

module.exports = KeyDown;
