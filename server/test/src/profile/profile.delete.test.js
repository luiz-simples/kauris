'use strict';

var srcKauris     = '../../../src/';
var q             = require('q');
var lodash        = require('lodash');
var profileHelper = require('./profile.helper');
var expect        = require('chai').expect;
var ProfileModel  = require(srcKauris.concat('profile/profile.model'));
var ProfileDelete = require(srcKauris.concat('profile/profile.delete'));

describe('Profile', function() {
  describe('Delete', function () {
    describe('#save', function () {
      var injector, expectedDeleteRow, profileValidationCalled, deleteArgumentsCalled, profileArgs;

      beforeEach(function() {
        deleteArgumentsCalled   = false;
        profileValidationCalled = false;

        function ProfileValidation() {
          var validation = this;

          validation.beforeDelete = function(args) {
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
                deleteArgumentsCalled = lodash.cloneDeep(args);
                var deletedRow        = lodash.cloneDeep(profileArgs);
                resolve(deletedRow);
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
        }).then(profileHelper.prepareDeleteProfile).then(function(deleteProfile) {
          expectedDeleteRow = deleteProfile;
        });
      });

      it('should delete profile with valid arguments.', function() {
        var profileDelete = new ProfileDelete(injector);

        return profileDelete.save(lodash.cloneDeep(profileArgs)).then(function(profileDeleted) {
          expect(profileDeleted).to.be.deep.equal(profileArgs);

          expect(profileValidationCalled).to.be.deep.equal(profileArgs);
          expect(deleteArgumentsCalled).to.be.deep.equal(expectedDeleteRow);
        }).catch(function(err) {
          throw err;
        });
      });
    });
  });
});
