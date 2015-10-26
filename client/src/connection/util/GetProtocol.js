/*globals location:false*/
'use strict';

function GetProtocol() {
  var protocol = String(location.protocol).trim();
  if (protocol === ':') return 'http';
  return protocol;
}

module.exports = GetProtocol;
