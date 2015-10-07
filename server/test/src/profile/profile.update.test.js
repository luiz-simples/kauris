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
      var injector, expectedInsertRow, profileValidationCalled, updateArgumentsCalled, profileArgs;

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

          expectedInsertRow = {
            tableName: 'profile',
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
                var insertRow         = lodash.cloneDeep(profileArgs);
                resolve(insertRow);
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

      it('should save profile with valid arguments.', function() {
        var profileUpdate = new ProfileUpdate(injector);

        return profileUpdate.save(lodash.cloneDeep(profileArgs)).then(function(profileCreated) {
          expect(profileCreated).to.be.have.property('profileId').and.is.a('number');
          expect(profileCreated).to.be.have.property('profileName', profileArgs.profileName).and.is.a('string');

          expect(profileValidationCalled).to.be.deep.equal(profileArgs);
          expect(updateArgumentsCalled).to.be.deep.equal(expectedInsertRow);
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });
    });
  });
});
