'use strict';

var RequesterHttp = require('./RequesterHttp');

function Requester() {
  var req = this;
  var http;

  var getHttp = function() {
    if (!http)
      http = new RequesterHttp();

    return http;
  };

  req.getProtocol = function() {
    return getHttp();
  };
}

module.exports = Requester;
