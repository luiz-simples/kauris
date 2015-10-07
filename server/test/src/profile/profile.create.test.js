'use strict';

var srcKauris     = '../../../src/';
var q             = require('q');
var lodash        = require('lodash');
var profileHelper = require('./profile.helper');
var expect        = require('chai').expect;
var profileModel  = require(srcKauris.concat('profile/profile.model'));
var ProfileCreate = require(srcKauris.concat('profile/profile.create'));

describe('Profile', function() {
  describe('Create', function () {
    describe('#save', function () {
      var injector, expectedInsertRow, profileValidationCalled, insertArgumentsCalled, profileArgs;

      beforeEach(function() {
        insertArgumentsCalled   = false;
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
          profileArgs = newProfileArgs;

          expectedInsertRow = {
            tableName: 'profile',
            action: 'insert',
            fields: [
              { attr: 'profileName', kind: 'name', value: profileArgs.profileName }
            ]
          };

          var connection = {
            insert: function(args) {
              return q.Promise(function(resolve) {
                insertArgumentsCalled = lodash.cloneDeep(args);
                var insertRow         = lodash.cloneDeep(profileArgs);
                insertRow.profileId   = 10;
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
        var profileCreate = new ProfileCreate(injector);

        return profileCreate.save(lodash.cloneDeep(profileArgs)).then(function(profileCreated) {
          expect(profileCreated).to.be.have.property('profileId').and.is.a('number');
          expect(profileCreated).to.be.have.property('profileName', profileArgs.profileName).and.is.a('string');

          expect(profileValidationCalled).to.be.deep.equal(profileArgs);
          expect(insertArgumentsCalled).to.be.deep.equal(expectedInsertRow);
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });
    });
  });
});
