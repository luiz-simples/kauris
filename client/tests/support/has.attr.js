'use strict';

var ReactDOM = require('react-dom');
var findElement = ReactDOM.findDOMNode;

function HasAttr(ref, attr) {
  var element = findElement(ref);
  return element.hasAttribute(attr);
}

module.exports = HasAttr;
