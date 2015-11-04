'use strict';

var getText     = require('./get.text');
var hasAttr     = require('./has.attr');
var hasClass    = require('./has.class');
var changeText  = require('./change.text');
var changeValue = require('./change.value');

module.exports = {
  getText:     getText,
  hasAttr:     hasAttr,
  hasClass:    hasClass,
  changeText:  changeText,
  changeValue: changeValue
};
