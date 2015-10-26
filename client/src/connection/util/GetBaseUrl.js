'use strict';

var getHost = require('./GetHost');
var getProtocol = require('./GetProtocol');

function GetBaseUrl(prtc, host, port) {
  prtc = String(prtc || getProtocol()).trim();
  host = String(host || getHost()).trim();
  port = String(port || 1337).trim();

  var baseRoute = '';
  if (prtc) baseRoute = prtc.concat('://', baseRoute);
  if (host) baseRoute = baseRoute.concat(host);
  if (port) baseRoute = baseRoute.concat(':', port);

  return baseRoute;
}

module.exports = GetBaseUrl;
