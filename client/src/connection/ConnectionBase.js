/*globals location:false*/
'use strict';

var separator = '/';

var getProtocol = function() {
  var protocol = String(location.protocol).trim();
  if (protocol === ':') return 'http';
  return protocol;
};

var getHost = function() {
  var host = String(location.host).trim();
  if (!host.length) return '127.0.0.1';
  return host;
};

var baseUrl = function(prtc, host, port) {
  prtc = String(prtc || getProtocol()).trim();
  host = String(host || getHost()).trim();
  port = String(port || 1337).trim();

  var baseRoute = '';
  if (prtc) baseRoute = prtc.concat('://', baseRoute);
  if (host) baseRoute = baseRoute.concat(host);
  if (port) baseRoute = baseRoute.concat(':', port);

  return baseRoute;
};

var connectionBase = function(prtc, host, port, address) {
  var baseRoute = baseUrl(prtc, host, port);
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
};

module.exports = connectionBase;
