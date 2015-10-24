'use strict';

var promise = require('q').Promise;
var request = require('superagent');

function ConnectionHttp() {
  var connection = this;

  connection.request = function(verb, address, params) {
    return promise(function(resolve, reject) {
      request[(verb ? String(verb) : 'GET').toLowerCase()](address)
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
