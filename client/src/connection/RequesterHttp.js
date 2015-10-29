'use strict';

var promise = require('q').Promise;
var request = require('superagent');
var getUrlPath = require('./util/GetUrlPath');

function RequesterHttp(prtc, host, port) {
  var http = this;

  http.request = function(verb, address, params) {
    var url = getUrlPath(prtc, host, port, address);

    return promise(function(resolve, reject) {
      request[(verb ? String(verb) : 'GET').toLowerCase()](url)
        .send(params)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err) return reject(err);
          resolve(res);
        });
    });
  };
}

var httpInstance;
module.exports = {
  getInstance: function(prtc, host, port) {
    if (!httpInstance) httpInstance = new RequesterHttp(prtc, host, port);
    return httpInstance;
  }
};
