'use strict';

var srcKauris       = '../../../../src/';
var q               = require('q');
var profileHelper   = require('../profile.helper');
var userHelper      = require('../../user/user.helper');
var expect          = require('chai').expect;
var VerifyExistUser = require(srcKauris.concat('profile/checks/verify.exist.user'));
var UserModel       = require(srcKauris.concat('user/user.model'));
var ProfileModel    = require(srcKauris.concat('profile/profile.model'));

describe('Profile', function() {
  describe('Checks', function () {
    describe('VerifyExistUser', function () {
      describe('#check', function () {
        var injector, errorProfile, profileArgs, userArgs, string;

        beforeEach(function() {
          string       = 'string';
          injector     = {
            q:            q,
            UserModel:    UserModel,
            ProfileModel: ProfileModel
          };
          errorProfile = 'profile.exist.user';

          return profileHelper.prepareProfile().then(function(newProfileArgs) {
            newProfileArgs.profileId = 10;
            profileArgs = newProfileArgs;

            return userHelper.prepareUser().then(function(newUserArgs) {
              newUserArgs.userId      = 11;
              newUserArgs.userProfile = profileArgs.profileId;
              userArgs = newUserArgs;
            });
          });
        });

        it('should reject profile with user already registered.', function() {
          profileArgs.profileId = 10;

          return this.connectionMockLib.make([userArgs]).then(function(connectionMocked) {
            injector.connection = connectionMocked;
            var verifyExistUser = new VerifyExistUser(injector);

            return verifyExistUser.check(profileArgs);
          }).then(function() {
            return expect(false).to.be.ok;
          }).catch(function(error) {
            expect(error).to.a(string);
            expect(error).to.be.equal(errorProfile);
          });
        });

        it('should resolve profile with user not registered.', function() {
          var emptyRows             = [];
          var correctArgument       = null;
          var expectedSearchByModel = null;
          var callMethod = function(argument) {
            correctArgument = argument;
          };

          expectedSearchByModel = {
            tableName: 'users',
            limit: 1,
            fields: [{ attr: 'userId',      kind: 'primary' }],
            where:  [{ attr: 'userProfile', kind: 'foreign', value: profileArgs.profileId, comparator: '=' }]
          };

          return this.connectionMockLib.make(emptyRows, callMethod).then(function(connectionMocked) {
            injector.connection = connectionMocked;
            var verifyExistUser = new VerifyExistUser(injector);

            return verifyExistUser.check(profileArgs);
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
