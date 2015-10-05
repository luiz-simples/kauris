'use strict';

var srcKauris                = '../../../../src/';
var profileHelper            = require('../profile.helper');
var ProfileInsertValidations = require(srcKauris.concat('profile/insert/profile.insert.validations'));

var expect     = require('chai').expect;

describe('Profile', function() {
  describe('validations', function () {
    describe('#insert', function () {
      it('should reject profile with empty name.', function() {
        var errorProfileNameEmpty = 'profile.name.empty';

        return profileHelper.prepareProfile().then(function(profileArgs) {
          var empty = '';
          profileArgs.profileName = empty;

          var profileInsertValidations = new ProfileInsertValidations();
          return profileInsertValidations.verify(profileArgs);
        }).catch(function(error) {
          expect(error).to.a('array');
          expect(error).to.deep.equal([errorProfileNameEmpty]);
        });
      });
    });
  });
});
