/*globals jest:false, expect:false, pit:false */
'use strict';

var pathConnectionHttp = '../../../src/connection/ConnectionHttp';
jest.dontMock(pathConnectionHttp);
var ConnectionHttp = require(pathConnectionHttp);
var superagent = require('superagent');

describe('ConnectionHttp', function() {
  describe('#request', function() {
    var response, verbs, addr, args, connectionHttp, clearMocks;

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

      addr = 'http://localhost/profiles';

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

      args = { profileId: 1, profileName: 'Profile Name' };
      connectionHttp = new ConnectionHttp();
    });

    pit('should request post', function() {
      return connectionHttp.request(verbs.POST, addr, args).then(function(res) {
        expect(superagent.post.mock.calls).toEqual([[addr]]);
        expect(superagent.send.mock.calls).toEqual([[args]]);
        expect(superagent.set.mock.calls).toEqual([['Accept', 'application/json']]);
        expect(res).toEqual(response);
        clearMocks();
      });
    });

    pit('should request put', function() {
      return connectionHttp.request(verbs.PUT, addr, args).then(function(res) {
        expect(superagent.put.mock.calls).toEqual([[addr]]);
        expect(superagent.send.mock.calls).toEqual([[args]]);
        expect(superagent.set.mock.calls).toEqual([['Accept', 'application/json']]);
        expect(res).toEqual(response);
        clearMocks();
      });
    });

    pit('should request delete', function() {
      return connectionHttp.request(verbs.DELETE, addr, args).then(function(res) {
        expect(superagent.delete.mock.calls).toEqual([[addr]]);
        expect(superagent.send.mock.calls).toEqual([[args]]);
        expect(superagent.set.mock.calls).toEqual([['Accept', 'application/json']]);
        expect(res).toEqual(response);
        clearMocks();
      });
    });
  });
});
