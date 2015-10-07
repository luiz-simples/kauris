'use strict';

var srcKauris     = '../../../src/';
var q             = require('q');
var lodash        = require('lodash');
var profileHelper = require('./profile.helper');
var expect        = require('chai').expect;
var profileModel  = require(srcKauris.concat('profile/profile.model'));
var ProfileDelete = require(srcKauris.concat('profile/profile.delete'));

describe('Profile', function() {
  describe('Delete', function () {
    describe('#save', function () {
      var injector, expectedDeleteRow, profileValidationCalled, deleteArgumentsCalled, profileArgs;

      beforeEach(function() {
        deleteArgumentsCalled   = false;
        profileValidationCalled = false;

        var profileValidation = {
          beforeDelete: function(args) {
            return q.Promise(function(resolve) {
              profileValidationCalled = lodash.cloneDeep(args);
              resolve(args);
            });
          }
        };

        return profileHelper.prepareProfile().then(function(newProfileArgs) {
          newProfileArgs.profileId = 10;
          profileArgs = newProfileArgs;

          expectedDeleteRow = {
            tableName: 'profile',
            action: 'delete',

            where: [
              { attr: 'profileId', kind: 'primary', value: profileArgs.profileId }
            ]
          };

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
            profileModel: profileModel,
            profileValidation: profileValidation
          };
        });
      });

      it('should delete profile with valid arguments.', function() {
        var profileDelete = new ProfileDelete(injector);

        return profileDelete.save(lodash.cloneDeep(profileArgs)).then(function(profileDeleted) {
          expect(profileDeleted).to.be.deep.equal(profileArgs);

          expect(profileValidationCalled).to.be.deep.equal(profileArgs);
          expect(deleteArgumentsCalled).to.be.deep.equal(expectedDeleteRow);
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });
    });
  });
});
