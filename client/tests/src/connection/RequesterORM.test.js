'use strict';

var pathRequesterORM = '../../../src/connection/RequesterORM';
jest.dontMock(pathRequesterORM);
var RequesterORM = require(pathRequesterORM);

describe('RequesterORM', function() {
  describe('#url', function() {
    it('should return / when empty baseUrl', function() {
      var orm = new RequesterORM();
      var urlMounted  = orm.url();
      expect(urlMounted).toEqual('/');
    });

    it('should return /profiles when call .one("profiles")', function() {
      var orm = new RequesterORM();
      var routeName   = 'profiles';
      var urlMounted  = orm.one(routeName).url();
      expect(urlMounted).toEqual('/profiles');
    });

    it('should ignore / when call .one("/profiles")', function() {
      var orm = new RequesterORM();
      var routeName   = '/profiles';
      var urlMounted  = orm.one(routeName).url();
      expect(urlMounted).toEqual('/profiles');
    });

    it('should return /profiles when call .all("profiles")', function() {
      var orm = new RequesterORM();
      var routeName   = 'profiles';
      var urlMounted  = orm.all(routeName).url();
      expect(urlMounted).toEqual('/profiles');
    });

    it('should ignore / when call .all("/profiles")', function() {
      var orm = new RequesterORM();
      var routeName   = '/profiles';
      var urlMounted  = orm.all(routeName).url();
      expect(urlMounted).toEqual('/profiles');
    });

    it('should return /profiles when call .all("profiles").one(1)', function() {
      var orm = new RequesterORM();
      var urlMounted  = orm.all('profiles').one(1).url();
      expect(urlMounted).toEqual('/profiles/1');
    });

    it('should return others instances when call .all or .one', function() {
      var orm = new RequesterORM();
      var profiles    = orm.all('profiles');
      var profileNew  = profiles.one('new');

      expect(profiles.url()).toEqual('/profiles');
      expect(profileNew.url()).toEqual('/profiles/new');
    });
  });
});
