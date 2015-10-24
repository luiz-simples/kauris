'use strict';

var separator = '/';

var prepareStr = function(baseUrl) {
  baseUrl = baseUrl ? String(baseUrl).trim() : '';
  return baseUrl;
};

function WrapperBase(baseUrl) {
  var wrapperBase = this;
  baseUrl = prepareStr(baseUrl);

  var wrapper = function(name) {
    name = prepareStr(name);
    if (!name.length) return wrapperBase;

    var clearSep = name[0] === separator;
    if (clearSep) name = name.slice(-1 * (name.length-1));

    var base = baseUrl.concat(separator, name);
    return new WrapperBase(base);
  };

  wrapperBase.one = wrapper;
  wrapperBase.all = wrapper;
  wrapperBase.url = function() {
    if (!baseUrl.length) return separator;
    return baseUrl;
  };
}

module.exports = WrapperBase;
