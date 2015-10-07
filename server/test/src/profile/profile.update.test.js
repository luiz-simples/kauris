'use strict';

var srcKauris     = '../../../src/';
var q             = require('q');
var lodash        = require('lodash');
var profileHelper = require('./profile.helper');
var expect        = require('chai').expect;
var profileModel  = require(srcKauris.concat('profile/profile.model'));
var ProfileUpdate = require(srcKauris.concat('profile/profile.update'));

describe('Profile', function() {
  describe('Update', function () {
    describe('#save', function () {
      var injector, expecteUpdateRow, profileValidationCalled, updateArgumentsCalled, profileArgs;

      beforeEach(function() {
        updateArgumentsCalled   = false;
        profileValidationCalled = false;

        var profileValidation = {
          beforeSave: function(args) {
            return q.Promise(function(resolve) {
              profileValidationCalled = lodash.cloneDeep(args);
              resolve(args);
            });
          }
        };

        return profileHelper.prepareProfile().then(function(newProfileArgs) {
          newProfileArgs.profileId = 10;
          profileArgs = newProfileArgs;

          expecteUpdateRow = {
            tableName: 'profiles',
            action: 'update',

            fields: [
              { attr: 'profileName', kind: 'name', value: profileArgs.profileName }
            ],

            where: [
              { attr: 'profileId', kind: 'primary', value: profileArgs.profileId }
            ]
          };

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
            profileModel: profileModel,
            profileValidation: profileValidation
          };
        });
      });

      it('should update profile with valid arguments.', function() {
        var profileUpdate = new ProfileUpdate(injector);

        return profileUpdate.save(lodash.cloneDeep(profileArgs)).then(function(profileUpdated) {
          expect(profileUpdated).to.be.deep.equal(profileArgs);

          expect(profileValidationCalled).to.be.deep.equal(profileArgs);
          expect(updateArgumentsCalled).to.be.deep.equal(expecteUpdateRow);
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });
    });
  });
});
