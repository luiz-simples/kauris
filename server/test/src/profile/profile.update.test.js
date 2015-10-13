'use strict';

var srcKauris     = '../../../src/';
var q             = require('q');
var lodash        = require('lodash');
var profileHelper = require('./profile.helper');
var expect        = require('chai').expect;
var ProfileModel  = require(srcKauris.concat('profile/profile.model'));
var ProfileUpdate = require(srcKauris.concat('profile/profile.update'));

describe('Profile', function() {
  describe('Update', function () {
    describe('#save', function () {
      var injector, expecteUpdateRow, profileValidationCalled, updateArgumentsCalled, profileArgs;

      beforeEach(function() {
        updateArgumentsCalled   = false;
        profileValidationCalled = false;

        function ProfileValidation() {
          var validation = this;

          validation.beforeSave = function(args) {
            return q.Promise(function(resolve) {
              profileValidationCalled = lodash.cloneDeep(args);
              resolve(args);
            });
          };
        }

        return profileHelper.prepareProfile().then(function(newProfileArgs) {
          newProfileArgs.profileId = 10;
          profileArgs = newProfileArgs;

          var connection = {
            persist: function(args) {
              return q.Promise(function(resolve) {
                updateArgumentsCalled = lodash.cloneDeep(args);
                var updateRow         = lodash.cloneDeep(profileArgs);
                resolve(updateRow);
              });
            }
          };

          injector = {
            q: q,
            lodash: lodash,
            connection: connection,
            ProfileModel: ProfileModel,
            ProfileValidation: ProfileValidation
          };

          return profileArgs;
        }).then(profileHelper.prepareUpdateProfile).then(function(updateProfile) {
          expecteUpdateRow = updateProfile;
        });
      });

      it('should update profile with valid arguments.', function() {
        var profileUpdate = new ProfileUpdate(injector);

        return profileUpdate.save(lodash.cloneDeep(profileArgs)).then(function(profileUpdated) {
          expect(profileUpdated).to.be.deep.equal(profileArgs);

          expect(profileValidationCalled).to.be.deep.equal(profileArgs);
          expect(updateArgumentsCalled).to.be.deep.equal(expecteUpdateRow);
        }).catch(function(err) {
          throw err;
        });
      });
    });
  });
});
