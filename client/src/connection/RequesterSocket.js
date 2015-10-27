'use strict';

var promise    = require('q').Promise;
var socketIo   = require('socket.io-client');
var getUrlPath = require('./util/GetUrlPath');

var counter = {};

var getCount = function(mes) {
  if (!counter.hasOwnProperty(mes))
    counter[mes] = 0;

  return ++counter[mes];
};

function RequesterSocket(prtc, host, port) {
  var socket = this;
  var hostSocket = getUrlPath(prtc, host, port);
  var socketClient = socketIo(hostSocket);

  socket.request = function(verb, address, params) {
    var emitMsg = verb.concat(':', address);
    var onceMsg = emitMsg.concat(' - ', '000000000'.concat(getCount(emitMsg)).slice(-9));
    params.waitMsg = onceMsg;

    return promise(function(resolve, reject) {
      socketClient.once(onceMsg, function(res) {
        if (res.hasOwnProperty('err') && res.err) return reject(res.err);
        resolve(res.data);
      });

      socketClient.emit(emitMsg, params);
    });
  };
}

module.exports = RequesterSocket;
