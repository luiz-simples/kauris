'use strict';

var ReactDOM = require('react-dom');
var findElement = ReactDOM.findDOMNode;
var changeValue = require('./change.value');

function ChangeText(ref, text) {
  var reference = findElement(ref);
  changeValue(reference, text);
}

module.exports = ChangeText;
