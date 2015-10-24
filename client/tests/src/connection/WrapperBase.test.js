'use strict';

var pathWrapperBase = '../../../src/connection/WrapperBase';
jest.dontMock(pathWrapperBase);
var WrapperBase = require(pathWrapperBase);

describe('WrapperBase', function() {
  describe('#url', function() {
    var baseUrl;

    beforeEach(function() {
      baseUrl = 'http://localhost/';
    });

    it('should return base url', function() {
      var wrapperBase = new WrapperBase(baseUrl);
      var urlMounted  = wrapperBase.url();
      expect(urlMounted).toEqual('http://localhost/');
    });

    it('should return / when empty baseUrl', function() {
      var wrapperBase = new WrapperBase();
      var urlMounted  = wrapperBase.url();
      expect(urlMounted).toEqual('/');
    });

    it ('should return /profiles when call .one("profiles")', function() {
      var wrapperBase = new WrapperBase();
      var routeName   = 'profiles';
      var urlMounted  = wrapperBase.one(routeName).url();
      expect(urlMounted).toEqual('/profiles');
    });

    it ('should ignore / when call .one("/profiles")', function() {
      var wrapperBase = new WrapperBase();
      var routeName   = '/profiles';
      var urlMounted  = wrapperBase.one(routeName).url();
      expect(urlMounted).toEqual('/profiles');
    });

    it ('should return /profiles when call .all("profiles")', function() {
      var wrapperBase = new WrapperBase();
      var routeName   = 'profiles';
      var urlMounted  = wrapperBase.all(routeName).url();
      expect(urlMounted).toEqual('/profiles');
    });

    it ('should ignore / when call .all("/profiles")', function() {
      var wrapperBase = new WrapperBase();
      var routeName   = '/profiles';
      var urlMounted  = wrapperBase.all(routeName).url();
      expect(urlMounted).toEqual('/profiles');
    });

    it ('should return /profiles when call .all("profiles").one(1)', function() {
      var wrapperBase = new WrapperBase();
      var urlMounted  = wrapperBase.all('profiles').one(1).url();
      expect(urlMounted).toEqual('/profiles/1');
    });

    it ('should return others instances when call .all or .one', function() {
      var wrapperBase = new WrapperBase();
      var profiles    = wrapperBase.all('profiles');
      var profileNew  = profiles.one('new');

      expect(profiles.url()).toEqual('/profiles');
      expect(profileNew.url()).toEqual('/profiles/new');
    });
  });
});
