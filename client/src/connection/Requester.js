'use strict';

var RequesterHttp   = require('./RequesterHttp');
var RequesterSocket = require('./RequesterSocket');
var localStorageApp = require('./LocalStorageApp');

function Requester() {
  var req = this;
  var http;
  var socket;

  var hostName     = '127.0.0.1';
  var portHttp     = 1337;
  var portSocket   = 1338;
  var hostProtocol = 'http';

  var get = {
    http: function() {
      if (!http)
        http = RequesterHttp.getInstance(hostProtocol, hostName, portHttp);

      return http;
    },

    socket: function() {
      if (!socket)
        socket = RequesterSocket.getInstance(hostProtocol, hostName, portSocket);

      return socket;
    }
  };

  req.getProtocol = function() {
    var connectionHttp = 'http';
    var connectionProtocol = localStorageApp.getItem('connectionProtocol');
    if (!connectionProtocol) connectionProtocol = connectionHttp;
    localStorageApp.setItem('connectionProtocol', connectionProtocol);
    return get[connectionProtocol]();
  };
}

module.exports = Requester;
