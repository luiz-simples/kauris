'use strict';

var ReactDOM = require('react-dom');
var findElement = ReactDOM.findDOMNode;

function GetText(ref) {
  var element = findElement(ref);
  return element.textContent;
}

module.exports = GetText;
