'use strict';

var srcKauris            = '../../../../src/';
var q                    = require('q');
var profileHelper        = require('../profile.helper');
var expect               = require('chai').expect;
var VerifyRegisteredName = require(srcKauris.concat('profile/checks/verify.registered.name'));

describe('Profile', function() {
  describe('Checks', function () {
    describe('VerifyRegisteredName', function () {
      describe('#check', function () {
        var injector, errorProfile, profileArgs, string;

        beforeEach(function() {
          string       = 'string';
          injector     = { q: q };
          errorProfile = 'profile.name.registered';

          return profileHelper.prepareProfile().then(function(newProfileArgs) {
            profileArgs = newProfileArgs;
          });
        });

        it('should reject profile with name already registered.', function() {
          profileArgs.profileId = 10;

          return this.connectionMockLib.make([profileArgs]).then(function(connectionMocked) {
            injector.connection = connectionMocked;
            var verifyRegisteredName = new VerifyRegisteredName(injector);

            return verifyRegisteredName.check(profileArgs);
          }).then(function() {
            return expect(false).to.be.ok;
          }).catch(function(error) {
            expect(error).to.a(string);
            expect(error).to.be.equal(errorProfile);
          });
        });

        it('should resolve profile with name not registered.', function() {
          var emptyRows       = [];
          var correctArgument = null;
          var expectedSearchByModel = null;
          var callMethod = function(argument) {
            correctArgument = argument;
          };

          expectedSearchByModel = {
            tableName: 'profiles',
            limit: 1,
            fields: [
              { attr: 'profileName', kind: 'name', value: profileArgs.profileName, comparator: 'like' }
            ]
          };

          return this.connectionMockLib.make(emptyRows, callMethod).then(function(connectionMocked) {
            injector.connection = connectionMocked;
            var verifyRegisteredName = new VerifyRegisteredName(injector);

            return verifyRegisteredName.check(profileArgs);
          }).then(function() {
            expect(correctArgument).to.be.deep.equal(expectedSearchByModel);
          }).catch(function() {
            return expect(false).to.be.ok;
          });
        });
      });
    });
  });
});
