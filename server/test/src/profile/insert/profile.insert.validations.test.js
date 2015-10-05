'use strict';

var srcKauris                = '../../../../src/';
var q                        = require('q');
var profileHelper            = require('../profile.helper');
var expect                   = require('chai').expect;
var ProfileInsertValidations = require(srcKauris.concat('profile/insert/profile.insert.validations'));


describe('Profile', function() {
  describe('validations', function () {
    describe('#insert', function () {
      it('should reject profile with empty name.', function() {
        var errorProfileNameEmpty = 'profile.name.empty';
        var connection = {
          searchByModel: function() {
            return q.Promise(function(resolve) {
              resolve({ count: 0, data: [] });
            });
          }
        };

        return profileHelper.prepareProfile().then(function(profileArgs) {
          var empty = '';
          profileArgs.profileName = empty;

          var profileInsertValidations = new ProfileInsertValidations(connection);
          return profileInsertValidations.verify(profileArgs);
        }).catch(function(error) {
          expect(error).to.a('array');
          expect(error).to.deep.equal([errorProfileNameEmpty]);
        });
      });

      it('should reject profile with name already registered.', function() {
        var connection = {
          searchByModel: function() {
            return profileHelper.prepareProfile().then(function(profileArgs) {
              profileArgs.profileId = 10;
              return { count: 1, data: [profileArgs] };
            });
          }
        };

        return profileHelper.prepareProfile().then(function(profileArgs) {
          var profileInsertValidations = new ProfileInsertValidations(connection);
          return profileInsertValidations.verify(profileArgs);
        }).then(function() {
          return expect(false).to.be.ok;
        }).catch(function(error) {
          expect(error).to.a('array');
          expect(error).to.deep.equal(['profile.name.registered']);
        });
      });

      it('should call searchByModel with correct argument.', function() {
        var profileName = '';
        var correctArgument = null;

        var connection = {
          searchByModel: function(argumentModel) {
            return q.Promise(function(resolve) {
              correctArgument = argumentModel;
              resolve({ count: 0, data: [] });
            });
          }
        };

        return profileHelper.prepareProfile().then(function(profileArgs) {
          profileName = profileArgs.profileName;
          var profileInsertValidations = new ProfileInsertValidations(connection);
          return profileInsertValidations.verify(profileArgs);
        }).then(function() {
          expect(correctArgument).to.be.deep.equal({
            tableName: 'profile',
            limit: 1,
            fields: [
              { attr: 'profileName', kind: 'name', value: profileName, comparator: 'like' }
            ]
          });
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });

      it('should resolve verify profile arguments.', function() {
        var connection = {
          searchByModel: function() {
            return q.Promise(function(resolve) {
              resolve({ count: 0, data: [] });
            });
          }
        };

        return profileHelper.prepareProfile().then(function(profileArgs) {
          var profileInsertValidations = new ProfileInsertValidations(connection);
          return profileInsertValidations.verify(profileArgs).then(function(profileResolved) {
            expect(profileResolved).to.be.deep.equal(profileArgs);
          });
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });
    });
  });
});
