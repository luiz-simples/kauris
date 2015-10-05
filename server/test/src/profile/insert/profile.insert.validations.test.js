'use strict';

var srcKauris            = '../../../../src/';
var q                    = require('q');
var profileHelper        = require('../profile.helper');
var expect               = require('chai').expect;
var ProfileServiceInsert = require(srcKauris.concat('profile/services/profile.service.insert'));

describe('Profile', function() {
  describe('Service', function () {
    describe('#insert', function () {
      var connection;

      beforeEach(function() {
        connection = {
          searchByModel: function() {
            return q.Promise(function(resolve) {
              resolve({ count: 0, data: [] });
            });
          }
        };
      });

      it('should resolve verify with profile valid arguments.', function() {
        return profileHelper.prepareProfile().then(function(profileArgs) {
          var profileServiceInsert = new ProfileServiceInsert(connection);
          return profileServiceInsert.insert(profileArgs).then(function(profileResolved) {
            expect(profileResolved).to.be.deep.equal(profileArgs);
          });
        }).catch(function() {
          return expect(false).to.be.ok;
        });
      });

      it('should reject profile with empty name.', function() {
        var errorProfileNameEmpty = 'profile.name.empty';
        return profileHelper.prepareProfile().then(function(profileArgs) {
          var empty = '';
          profileArgs.profileName = empty;

          var profileServiceInsert = new ProfileServiceInsert(connection);
          return profileServiceInsert.insert(profileArgs);
        }).then(function() {
          return expect(false).to.be.ok;
        }).catch(function(error) {
          expect(error).to.a('string');
          expect(error).to.be.equal(errorProfileNameEmpty);
        });
      });

      it('should reject profile with name already registered.', function() {
        connection = {
          searchByModel: function() {
            return profileHelper.prepareProfile().then(function(profileArgs) {
              profileArgs.profileId = 10;
              return { count: 1, data: [profileArgs] };
            });
          }
        };

        return profileHelper.prepareProfile().then(function(profileArgs) {
          var profileServiceInsert = new ProfileServiceInsert(connection);
          return profileServiceInsert.insert(profileArgs);
        }).then(function() {
          return expect(false).to.be.ok;
        }).catch(function(error) {
          expect(error).to.a('string');
          expect(error).to.be.equal('profile.name.registered');
        });
      });

      it('should call searchByModel with correct argument.', function() {
        var profileName = '';
        var correctArgument = null;

        connection = {
          searchByModel: function(argumentModel) {
            return q.Promise(function(resolve) {
              correctArgument = argumentModel;
              resolve({ count: 0, data: [] });
            });
          }
        };

        return profileHelper.prepareProfile().then(function(profileArgs) {
          profileName = profileArgs.profileName;
          var profileServiceInsert = new ProfileServiceInsert(connection);
          return profileServiceInsert.insert(profileArgs);
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
    });
  });
});
