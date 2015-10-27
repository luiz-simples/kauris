'use strict';

function GetBaseUrl(prtc, host, port) {
  var baseRoute = '';
  if (prtc) baseRoute = prtc.concat('://', baseRoute);
  if (host) baseRoute = baseRoute.concat(host);
  if (port) baseRoute = baseRoute.concat(':', port);

  return baseRoute;
}

module.exports = GetBaseUrl;
