'use strict';

var ReactDOM = require('react-dom');
var findElement = ReactDOM.findDOMNode;

function HasClass(ref, className) {
  var element = findElement(ref);
  var list    = element.classList;

  return Object.keys(list).map(function(key) {
    return list[key];
  }).indexOf(className) > -1;
}

module.exports = HasClass;
