'use strict';

var srcKauris     = '../../../src/';
var q             = require('q');
var lodash        = require('lodash');
var profileHelper = require('./profile.helper');
var expect        = require('chai').expect;
var ProfileModel  = require(srcKauris.concat('profile/profile.model'));
var ProfileCreate = require(srcKauris.concat('profile/profile.create'));

describe('Profile', function() {
  describe('Create', function () {
    describe('#save', function () {
      var injector, expectedCreateRow, profileValidationCalled, createArgumentsCalled, profileArgs;

      beforeEach(function() {
        createArgumentsCalled   = false;
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
          profileArgs = newProfileArgs;

          expectedCreateRow = {
            tableName: 'profiles',
            action: 'create',
            fields: [
              { attr: 'profileName', kind: 'name', value: profileArgs.profileName }
            ]
          };

          var connection = {
            persist: function(args) {
              return q.Promise(function(resolve) {
                createArgumentsCalled = lodash.cloneDeep(args);
                var createRow         = lodash.cloneDeep(profileArgs);
                createRow.profileId   = 10;
                resolve(createRow);
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
        });
      });

      it('should create profile with valid arguments.', function() {
        var profileCreate = new ProfileCreate(injector);

        return profileCreate.save(lodash.cloneDeep(profileArgs)).then(function(profileCreated) {
          expect(profileCreated).to.be.have.property('profileId').and.is.a('number');
          expect(profileCreated).to.be.have.property('profileName', profileArgs.profileName).and.is.a('string');

          expect(profileValidationCalled).to.be.deep.equal(profileArgs);
          expect(createArgumentsCalled).to.be.deep.equal(expectedCreateRow);
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });
    });
  });
});
