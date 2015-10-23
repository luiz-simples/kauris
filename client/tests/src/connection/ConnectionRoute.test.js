/*globals jest:false, expect:false */
'use strict';

var pathConnectionRoute = '../../../src/connection/ConnectionRoute';
jest.dontMock(pathConnectionRoute);
var ConnectionRoute = require(pathConnectionRoute);

describe('ConnectionRoute', function() {
  var baseUrl;

  beforeEach(function() {
    baseUrl = 'http://localhost';
  });

  it('should return base url', function() {
    var connectionRoute = new ConnectionRoute(baseUrl);
    var urlMounted = connectionRoute.getUrl();
    expect(urlMounted).toEqual('http://localhost/');
  });

  it('should return / when empty baseUrl', function() {
    var connectionRoute = new ConnectionRoute();
    var urlMounted = connectionRoute.getUrl();
    expect(urlMounted).toEqual('/');
  });

  it ('should return /profiles when call .one("profiles")', function() {
    var connectionRoute = new ConnectionRoute();
    var routeName = 'profiles';
    var urlMounted = connectionRoute.one(routeName).getUrl();
    expect(urlMounted).toEqual('/profiles');
  });

  it ('should ignore / when call .one("/profiles")', function() {
    var connectionRoute = new ConnectionRoute();
    var routeName = '/profiles';
    var urlMounted = connectionRoute.one(routeName).getUrl();
    expect(urlMounted).toEqual('/profiles');
  });

  it ('should return /profiles when call .all("profiles")', function() {
    var connectionRoute = new ConnectionRoute();
    var routeName = 'profiles';
    var urlMounted = connectionRoute.all(routeName).getUrl();
    expect(urlMounted).toEqual('/profiles');
  });

  it ('should ignore / when call .all("/profiles")', function() {
    var connectionRoute = new ConnectionRoute();
    var routeName = '/profiles';
    var urlMounted = connectionRoute.all(routeName).getUrl();
    expect(urlMounted).toEqual('/profiles');
  });

  it ('should return /profiles when call .all("profiles").one(1)', function() {
    var connectionRoute = new ConnectionRoute();
    var urlMounted = connectionRoute.all('profiles').one(1).getUrl();
    expect(urlMounted).toEqual('/profiles/1');
  });
});
