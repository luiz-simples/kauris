/*globals location:false*/
'use strict';

function GetHost() {
  var host = String(location.host).trim();
  if (!host.length) return '127.0.0.1';
  return host;
}

module.exports = GetHost;
