'use strict';
var q = require('q');

var pathRequester       = '../../../src/connection/Requester';
var pathRequesterHttp   = '../../../src/connection/RequesterHttp';
var pathRequesterSocket = '../../../src/connection/RequesterSocket';
var pathLocalStorageApp = '../../../src/connection/LocalStorageApp';

jest.dontMock(pathRequester);
jest.dontMock(pathRequesterHttp);
jest.dontMock(pathRequesterSocket);
jest.dontMock(pathLocalStorageApp);

var Requester = require(pathRequester);
var RequesterHttp = require(pathRequesterHttp);
var localStorageApp = require(pathLocalStorageApp);
var RequesterSocket = require(pathRequesterSocket);

describe('Requester', function() {
  describe('#getProtocol', function() {
    var clearMocks, requester, err;

    beforeEach(function() {
      err = function(e) { throw e; };
      clearMocks = function() {};
      requester = new Requester();
    });

    afterEach(function() {
      clearMocks();
    });

    pit('should http by default', function() {
      var requesterHttp = RequesterHttp.getInstance();

      requesterHttp.request = jest.genMockFunction().mockImplementation(function() {
        return q.Promise(function(resolve) {
          resolve();
        });
      });

      var path   = 'http://localhost/profiles';
      var get    = 'GET';
      var params = {};
      return requester.getProtocol().request(get, path, params).then(function() {
        expect(requesterHttp.request.mock.calls).toEqual([[get, path, params]]);
      }).catch(err);
    });

    pit('should socket by localStorage', function() {
      var requesterSocket = RequesterSocket.getInstance();
      localStorageApp.setItem('connectionProtocol', 'socket');

      requesterSocket.request = jest.genMockFunction().mockImplementation(function() {
        return q.Promise(function(resolve) {
          resolve();
        });
      });

      var path   = 'http://localhost/circles';
      var get    = 'POST';
      var params = { id: 1, name: 'Blá' };
      return requester.getProtocol().request(get, path, params).then(function() {
        expect(requesterSocket.request.mock.calls).toEqual([[get, path, params]]);
      }).catch(err);
    });
  });
});
