'use strict';

var pathGetUrlPath = '../../../src/connection/util/GetUrlPath';
var pathGetBaseUrl = '../../../src/connection/util/GetBaseUrl';
var pathRequesterHttp = '../../../src/connection/RequesterHttp';

jest.dontMock(pathGetBaseUrl);
jest.dontMock(pathGetUrlPath);
jest.dontMock(pathRequesterHttp);

var RequesterHttp = require(pathRequesterHttp);
var superagent = require('superagent');

describe('RequesterHttp', function() {
  describe('#request with initializers', function() {
    var response,
      verbs,
      addr,
      args,
      path,
      http,
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

      path = '/profiles';
      addr = 'http://127.0.0.1:1337'.concat(path);

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

      err = function(e) {
        throw e;
      };

      args = { profileId: 1, profileName: 'Profile Name' };
      var prtc = 'http';
      var host = '127.0.0.1';
      var port = '1337';
      http = RequesterHttp.getInstance(prtc, host, port);

      verbCall = [[addr]];
      sendCall = [[args]];
      acceptCall = [['Accept', 'application/json']];
    });

    afterEach(function() {
      clearMocks();
    });

    pit('should request get', function() {
      return http.request(verbs.GET, path, args).then(function(res) {
        expect(superagent.get.mock.calls).toEqual(verbCall);
        expect(superagent.send.mock.calls).toEqual(sendCall);
        expect(superagent.set.mock.calls).toEqual(acceptCall);
        expect(res).toEqual(response);
      }).catch(err);
    });

    pit('should request post', function() {
      return http.request(verbs.POST, path, args).then(function(res) {
        expect(superagent.post.mock.calls).toEqual(verbCall);
        expect(superagent.send.mock.calls).toEqual(sendCall);
        expect(superagent.set.mock.calls).toEqual(acceptCall);
        expect(res).toEqual(response);
      }).catch(err);
    });

    pit('should request put', function() {
      return http.request(verbs.PUT, path, args).then(function(res) {
        expect(superagent.put.mock.calls).toEqual(verbCall);
        expect(superagent.send.mock.calls).toEqual(sendCall);
        expect(superagent.set.mock.calls).toEqual(acceptCall);
        expect(res).toEqual(response);
      }).catch(err);
    });

    pit('should request delete', function() {
      return http.request(verbs.DELETE, path, args).then(function(res) {
        expect(superagent.delete.mock.calls).toEqual(verbCall);
        expect(superagent.send.mock.calls).toEqual(sendCall);
        expect(superagent.set.mock.calls).toEqual(acceptCall);
        expect(res).toEqual(response);
      }).catch(err);
    });
  });
});
