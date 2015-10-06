'use strict';

var srcKauris            = '../../../../src/';
var profileHelper        = require('../profile.helper');
var expect               = require('chai').expect;
var ProfileServiceInsert = require(srcKauris.concat('profile/services/profile.service.insert'));

describe('Profile', function() {
  describe('Service', function () {
    describe('#insert', function () {
      var test;

      beforeEach(function() {
        test = this;
      });

      it('should resolve verify with profile valid arguments.', function() {
        return profileHelper.prepareProfile().then(function(profileArgs) {
          return test.connectionMockLib.make().then(function(connectionMocked) {
            var profileServiceInsert = new ProfileServiceInsert(connectionMocked);
            return profileServiceInsert.insert(profileArgs).then(function(profileResolved) {
              expect(profileResolved).to.be.deep.equal(profileArgs);
            });
          });
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });

      it('should reject profile with empty name.', function() {
        var errorProfileNameEmpty = 'profile.name.empty';
        return profileHelper.prepareProfile().then(function(profileArgs) {
          var empty = '';
          profileArgs.profileName = empty;

          return test.connectionMockLib.make().then(function(connectionMocked) {
            var profileServiceInsert = new ProfileServiceInsert(connectionMocked);

            return profileServiceInsert.insert(profileArgs);
          });
        }).then(function() {
          return expect(false).to.be.ok;
        }).catch(function(error) {
          expect(error).to.a('string');
          expect(error).to.be.equal(errorProfileNameEmpty);
        });
      });

      it('should reject profile with name already registered.', function() {
        return profileHelper.prepareProfile().then(function(profileArgs) {
          profileArgs.profileId = 10;

          return test.connectionMockLib.make([profileArgs]).then(function(connectionMocked) {
            return profileHelper.prepareProfile().then(function(profileArgs) {
              var profileServiceInsert = new ProfileServiceInsert(connectionMocked);

              return profileServiceInsert.insert(profileArgs);
            });
          });
        }).then(function() {
          return expect(false).to.be.ok;
        }).catch(function(error) {
          expect(error).to.a('string');
          expect(error).to.be.equal('profile.name.registered');
        });
      });

      it('should call searchByModel with correct argument.', function() {
        var emptyRows       = [];
        var profileName     = '';
        var correctArgument = null;
        var expectedSearchByModel = null;
        var callMethod = function(argument) {
          correctArgument = argument;
        };

        return profileHelper.prepareProfile().then(function(profileArgs) {
          profileName = profileArgs.profileName;

          expectedSearchByModel = {
            tableName: 'profile',
            limit: 1,
            fields: [
              { attr: 'profileName', kind: 'name', value: profileName, comparator: 'like' }
            ]
          };

          return test.connectionMockLib.make(emptyRows, callMethod).then(function(connectionMocked) {
            var profileServiceInsert = new ProfileServiceInsert(connectionMocked);
            return profileServiceInsert.insert(profileArgs);
          });
        }).then(function() {
          expect(correctArgument).to.be.deep.equal(expectedSearchByModel);
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });
    });
  });
});
