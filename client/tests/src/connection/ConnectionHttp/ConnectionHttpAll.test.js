'use strict';

var pathConnectionHttp = '../../../../src/connection/ConnectionHttp';
var pathConnectionBase = '../../../../src/connection/ConnectionBase';

jest.dontMock(pathConnectionHttp);
jest.dontMock(pathConnectionBase);

var ConnectionHttp = require(pathConnectionHttp);
var superagent = require('superagent');

describe('ConnectionHttp', function() {
  describe('#request with initializers and full path', function() {
    var response,
      verbs,
      addr,
      args,
      connectionHttp,
      clearMocks,
      err,
      verbCall,
      sendCall,
      acceptCall;

    beforeEach(function() {
      verbs = {
        PUT:    'PUT',
        GET:    'GET',
        POST:   'POST',
        DELETE: 'DELETE'
      };

      clearMocks = function() {
        superagent.get.mockClear();
        superagent.set.mockClear();
        superagent.put.mockClear();
        superagent.post.mockClear();
        superagent.send.mockClear();
        superagent.delete.mockClear();
      };

      addr = 'http://127.0.0.1:1337/profiles';

      response = {
        request:  '',
        status:  200,
        data:     '',
        raw:      [],
        headers:  [],
        error:  null
      };

      superagent.__setMockResponse(function() {
        return response;
      });

      err = function(e) { throw e; };

      args = { profileId: 1, profileName: 'Profile Name' };
      var prtc = 'http';
      var host = '127.0.0.1';
      var port = '1337';
      connectionHttp = new ConnectionHttp(prtc, host, port);

      verbCall = [[addr]];
      sendCall = [[args]];
      acceptCall = [['Accept', 'application/json']];
    });

    afterEach(function() {
      clearMocks();
    });

    pit('should request get', function() {
      return connectionHttp.request(verbs.GET, addr, args).then(function(res) {
        expect(superagent.get.mock.calls).toEqual(verbCall);
        expect(superagent.send.mock.calls).toEqual(sendCall);
        expect(superagent.set.mock.calls).toEqual(acceptCall);
        expect(res).toEqual(response);
      }).catch(err);
    });

    pit('should request post', function() {
      return connectionHttp.request(verbs.POST, addr, args).then(function(res) {
        expect(superagent.post.mock.calls).toEqual(verbCall);
        expect(superagent.send.mock.calls).toEqual(sendCall);
        expect(superagent.set.mock.calls).toEqual(acceptCall);
        expect(res).toEqual(response);
      }).catch(err);
    });

    pit('should request put', function() {
      return connectionHttp.request(verbs.PUT, addr, args).then(function(res) {
        expect(superagent.put.mock.calls).toEqual(verbCall);
        expect(superagent.send.mock.calls).toEqual(sendCall);
        expect(superagent.set.mock.calls).toEqual(acceptCall);
        expect(res).toEqual(response);
      }).catch(err);
    });

    pit('should request delete', function() {
      return connectionHttp.request(verbs.DELETE, addr, args).then(function(res) {
        expect(superagent.delete.mock.calls).toEqual(verbCall);
        expect(superagent.send.mock.calls).toEqual(sendCall);
        expect(superagent.set.mock.calls).toEqual(acceptCall);
        expect(res).toEqual(response);
      }).catch(err);
    });
  });
});
