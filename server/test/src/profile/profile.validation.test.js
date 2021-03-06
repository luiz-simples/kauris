'use strict';

var srcKauris         = '../../../src/';
var q                 = require('q');
var lodash            = require('lodash');
var profileHelper     = require('./profile.helper');
var expect            = require('chai').expect;
var ProfileValidation = require(srcKauris.concat('profile/profile.validation'));

describe('Profile', function() {
  describe('Validations', function () {
    describe('#beforeSave', function () {
      var injector, verifyEmptyNameCalled, verifyRegisteredNameCalled, profileArgs;

      beforeEach(function() {
        verifyEmptyNameCalled = false;
        verifyRegisteredNameCalled = false;

        function VerifyEmptyName() {
          var validation = this;

          validation.check = function(args) {
            return q.Promise(function(resolve) {
              verifyEmptyNameCalled = lodash.cloneDeep(args);
              resolve(args);
            });
          };
        }

        function VerifyRegisteredName() {
          var validation = this;

          validation.check = function(args) {
            return q.Promise(function(resolve) {
              verifyRegisteredNameCalled = lodash.cloneDeep(args);
              resolve(args);
            });
          };
        }

        injector = {
          q: q,
          VerifyEmptyName: VerifyEmptyName,
          VerifyRegisteredName: VerifyRegisteredName
        };

        return profileHelper.prepareProfile().then(function(newProfileArgs) {
          profileArgs = newProfileArgs;
        });
      });

      it('should resolve verify with profile valid arguments.', function() {
        var profileValidation = new ProfileValidation(injector);

        return profileValidation.beforeSave(lodash.cloneDeep(profileArgs)).then(function(profileResolved) {
          expect(profileResolved).to.be.deep.equal(profileArgs);
          expect(verifyEmptyNameCalled).to.be.deep.equal(profileArgs);
          expect(verifyRegisteredNameCalled).to.be.deep.equal(profileArgs);
        }).catch(function(err) {
          throw err;
        });
      });
    });
  });
});
