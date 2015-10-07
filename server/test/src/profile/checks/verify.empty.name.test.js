'use strict';

var q               = require('q');
var profileHelper   = require('../profile.helper');
var expect          = require('chai').expect;
var srcKauris       = '../../../../src/';
var VerifyEmptyName = require(srcKauris.concat('profile/checks/verify.empty.name'));

describe('Profile', function() {
  describe('Checks', function () {
    describe('VerifyEmptyName', function () {
      describe('#check', function () {
        var injector, verifyEmptyName, errorProfileNameEmpty, profileArgs, string;

        beforeEach(function() {
          string                = 'string';
          injector              = { q: q };
          verifyEmptyName       = new VerifyEmptyName(injector);
          errorProfileNameEmpty = 'profile.name.empty';

          return profileHelper.prepareProfile().then(function(newProfileArgs) {
            profileArgs = newProfileArgs;
          });
        });

        it('should reject profile with name not filled.', function() {
          delete profileArgs.profileName;

          return verifyEmptyName.check(profileArgs).then(function() {
            return expect(false).to.be.ok;
          }).catch(function(error) {
            expect(error).to.a(string);
            expect(error).to.be.equal(errorProfileNameEmpty);
          });
        });

        it('should reject profile with empty name.', function() {
          profileArgs.profileName = '';

          return verifyEmptyName.check(profileArgs).then(function() {
            return expect(false).to.be.ok;
          }).catch(function(error) {
            expect(error).to.a(string);
            expect(error).to.be.equal(errorProfileNameEmpty);
          });
        });
      });
    });
  });
});
