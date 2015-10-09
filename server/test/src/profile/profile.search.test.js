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
          ProfileModel: ProfileModel
        };
      });

      it('should search by profile.', function() {
        var test = this;

        var emptyRows       = [];
        var correctArgument = null;
        var expectedSearchProfile = null;
        var callMethod = function(argument) {
          correctArgument = argument;
        };

        var params = {
          page: 10,
          limit: 25,
          fields: [
            { attr: 'attr3', kind: 'string' },
            { attr: 'attr4', kind: 'string' }
          ],

          where: [
            { attr: 'attr1', kind: 'string', value: 'test', comparator: '=' },
            { attr: 'attr2', kind: 'string', value: 'test', comparator: '=' }
          ],

          order: [
            { attr: 'attr3', kind: 'string', order: 'ASC'  },
            { attr: 'attr4', kind: 'string', order: 'DESC' }
          ]
        };

        expectedSearchProfile       = new ProfileModel();
        expectedSearchProfile.page  = 10;
        expectedSearchProfile.limit = 25;

        expectedSearchProfile.fields = [
          { attr: 'attr3', kind: 'string' },
          { attr: 'attr4', kind: 'string' }
        ];

        expectedSearchProfile.where = [
          { attr: 'attr1', kind: 'string', value: 'test', comparator: '=' },
          { attr: 'attr2', kind: 'string', value: 'test', comparator: '=' }
        ];

        expectedSearchProfile.order = [
          { attr: 'attr3', kind: 'string', order: 'ASC'  },
          { attr: 'attr4', kind: 'string', order: 'DESC' }
        ];

        return test.connectionMockLib.make(emptyRows, callMethod).then(function(connectionMocked) {
          injector.connection = connectionMocked;
          var profileSearch = new ProfileSearch(injector);
          return profileSearch.list(params);
        }).then(function() {
          expect(correctArgument).to.deep.equal(expectedSearchProfile);
        }).catch(function() {
          return expect(false).to.be.ok;
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
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });
    });
  });
});
