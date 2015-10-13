'use strict';

var srcKauris     = '../../../src/';
var q             = require('q');
var expect        = require('chai').expect;
var ProfileModel  = require(srcKauris.concat('profile/profile.model'));
var ProfileSearch = require(srcKauris.concat('profile/profile.search'));

describe('Profile', function() {
  describe('Search', function () {
    describe('#list', function () {
      var injector;

      beforeEach(function() {
        injector = {
          q: q,
          lodash: lodash,
          connection: connection,
          ProfileModel: ProfileModel,
          ProfileValidation: ProfileValidation
        };

          return profileArgs;
        }).then(profileHelper.prepareDeleteProfile).then(function(deleteProfile) {
          expectedDeleteRow = deleteProfile;
        });
      });

      it('should search by profile.', function() {
        var test = this;

        var emptyRows             = [];
        var correctArgument       = null;
        var expectedSearchProfile = null;
        var callMethod = function(argument) {
          correctArgument = argument;
        };

        var params = {
          page: 10,
          limit: 25,
          fields: [
            { attr: 'profileId',   kind: 'primary' },
            { attr: 'profileName', kind: 'string' }
          ],

          where: [
            { attr: 'profileId',   kind: 'primary', value: 404,    comparator: '=' },
            { attr: 'profileName', kind: 'string',  value: 'test', comparator: '=' }
          ],

          order: [
            { attr: 'profileId',   kind: 'primary', order: 'ASC'  },
            { attr: 'profileName', kind: 'string',  order: 'DESC' }
          ]
        };

        expectedSearchProfile       = new ProfileModel();
        expectedSearchProfile.page  = 10;
        expectedSearchProfile.limit = 25;

        expectedSearchProfile.fields = [
          { attr: 'profileId',   kind: 'primary' },
          { attr: 'profileName', kind: 'string' }
        ];

        expectedSearchProfile.where = [
          { attr: 'profileId',   kind: 'primary', value: 404,    comparator: '=' },
          { attr: 'profileName', kind: 'string',  value: 'test', comparator: 'like' }
        ];

        expectedSearchProfile.order = [
          { attr: 'profileId',   kind: 'primary', order: 'ASC'  },
          { attr: 'profileName', kind: 'string',  order: 'DESC' }
        ];

        return test.connectionMockLib.make(emptyRows, callMethod).then(function(connectionMocked) {
          injector.connection = connectionMocked;
          var profileSearch = new ProfileSearch(injector);
          return profileSearch.list(params);
        }).then(function() {
          expect(correctArgument).to.deep.equal(expectedSearchProfile);
        }).catch(function(err) {
          throw err;
        });
      });

      it('should forever search by profile.', function() {
        var test = this;

        var emptyRows       = [];
        var correctArgument = null;
        var expectedSearchProfile = null;
        var callMethod = function(argument) {
          correctArgument = argument;
        };

        var params = {};

        expectedSearchProfile       = new ProfileModel();
        expectedSearchProfile.page  = 1;
        expectedSearchProfile.limit = 10;
        expectedSearchProfile.where = [];
        expectedSearchProfile.order = [];

        return test.connectionMockLib.make(emptyRows, callMethod).then(function(connectionMocked) {
          injector.connection = connectionMocked;
          var profileSearch = new ProfileSearch(injector);
          return profileSearch.list(params);
        }).then(function() {
          expect(correctArgument).to.deep.equal(expectedSearchProfile);
        }).catch(function(err) {
          throw err;
        });
      });
    });
  });
});
