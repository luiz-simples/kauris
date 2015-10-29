'use strict';

var lodash = require('lodash');
var pathGetUrlPath = '../../../src/connection/util/GetUrlPath';
var pathGetBaseUrl = '../../../src/connection/util/GetBaseUrl';
var pathGetUrlPath = '../../../src/connection/util/GetUrlPath';
var pathGetBaseUrl = '../../../src/connection/util/GetBaseUrl';
var pathRequesterSocket = '../../../src/connection/RequesterSocket';

jest.dontMock(pathGetBaseUrl);
jest.dontMock(pathGetUrlPath);
jest.dontMock(pathRequesterSocket);

var RequesterSocket = require(pathRequesterSocket);
var socketIoClient = require('socket.io-client')();

var clearMocks = function() {
  socketIoClient.on.mockClear();
  socketIoClient.once.mockClear();
  socketIoClient.emit.mockClear();
};

describe('RequesterSocket', function() {
  describe('#request with initializers', function() {
    var
      verbs,
      args,
      path,
      socket;

    beforeEach(function() {
      verbs = {
        PUT:    'PUT',
        GET:    'GET',
        POST:   'POST',
        DELETE: 'DELETE'
      };

      path = '/profiles';

      args = { profileId: 1, profileName: 'Profile Name' };
      var prtc = 'http';
      var host = '127.0.0.1';
      var port = '1338';
      socket = RequesterSocket.getInstance(prtc, host, port);
    });

    afterEach(function() {
      clearMocks();
    });

    it('should request get', function() {
      var emitMsg  = 'GET:/profiles';
      var sendArgs = lodash.cloneDeep(args);
      sendArgs.waitMsg = emitMsg.concat(' - 000000001');

      var onceCall = [[sendArgs.waitMsg, function() {}]];
      var emitCall = [[emitMsg, sendArgs]];

      socket.request(verbs.GET, path, args);
      expect(socketIoClient.once.mock.calls).toEqual(onceCall);
      expect(socketIoClient.emit.mock.calls).toEqual(emitCall);
    });

    it('should request post', function() {
      var emitMsg  = 'POST:/profiles';
      var sendArgs = lodash.cloneDeep(args);
      sendArgs.waitMsg = emitMsg.concat(' - 000000001');

      var onceCall = [[sendArgs.waitMsg, function() {}]];
      var emitCall = [[emitMsg, sendArgs]];

      socket.request(verbs.POST, path, args);
      expect(socketIoClient.once.mock.calls).toEqual(onceCall);
      expect(socketIoClient.emit.mock.calls).toEqual(emitCall);
    });

    it('should request put', function() {
      var emitMsg  = 'PUT:/profiles';
      var sendArgs = lodash.cloneDeep(args);
      sendArgs.waitMsg = emitMsg.concat(' - 000000001');

      var onceCall = [[sendArgs.waitMsg, function() {}]];
      var emitCall = [[emitMsg, sendArgs]];

      socket.request(verbs.PUT, path, args);
      expect(socketIoClient.once.mock.calls).toEqual(onceCall);
      expect(socketIoClient.emit.mock.calls).toEqual(emitCall);
    });

    it('should request delete', function() {
      var emitMsg  = 'DELETE:/profiles';
      var sendArgs = lodash.cloneDeep(args);
      sendArgs.waitMsg = emitMsg.concat(' - 000000001');

      var onceCall = [[sendArgs.waitMsg, function() {}]];
      var emitCall = [[emitMsg, sendArgs]];

      socket.request(verbs.DELETE, path, args);
      expect(socketIoClient.once.mock.calls).toEqual(onceCall);
      expect(socketIoClient.emit.mock.calls).toEqual(emitCall);
    });
  });
});
