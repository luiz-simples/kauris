'use strict';

var promise = require('q').Promise;
var request = require('superagent');
var getUrlPath = require('./util/GetUrlPath');

function ConnectionHttp(prtc, host, port) {
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

module.exports = ConnectionHttp;
