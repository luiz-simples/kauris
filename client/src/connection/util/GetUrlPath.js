'use strict';

var separator = '/';
var getBaseUrl = require('./GetBaseUrl');

function GetUrlPath(prtc, host, port, address) {
  var baseRoute = getBaseUrl(prtc, host, port);
  var transformBase = baseRoute.length;

  if (transformBase) {
    var withoutBase = String(address).trim().indexOf(baseRoute) !== 0;
    var withoutSeparator = String(address).trim().indexOf(separator) !== 0;

    if (withoutBase) {
      if (withoutSeparator) address = separator.concat(address);
      address = baseRoute.concat(address);
    }
  }

  return address;
}

module.exports = GetUrlPath;
