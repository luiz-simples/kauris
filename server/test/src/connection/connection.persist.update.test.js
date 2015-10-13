'use strict';

var q             = require('q');
var squel         = require('squel');
var srcKauris     = '../../../src/';
var lodash        = require('lodash');
var profileHelper = require('../profile/profile.helper');
var expect        = require('chai').expect;
var Connection    = require(srcKauris.concat('connection'));

describe('Connection', function() {
  describe('#persist', function () {
    describe('Update record', function () {
      var updateRow, connection, sqlUpdatePassed, profileArgs;

      beforeEach(function() {
        sqlUpdatePassed = '';
        var pgConnection = {
          runScript: function(sql) {
            return q.Promise(function(resolve) {
              sqlUpdatePassed = sql;
              resolve();
            });
          }
        };

        var injector = {
          q: q,
          squel: squel,
          lodash: lodash,
          pgConnection: pgConnection
        };

        connection = new Connection(injector);

        return profileHelper.prepareProfile().then(function(profilePrepared) {
          profilePrepared.profileId = 10;
          profileArgs = profilePrepared;
          return profileArgs;
        }).then(profileHelper.prepareUpdateProfile).then(function(updateProfile) {
          updateRow = updateProfile;
        });
      });

      it('should pass sql for update record.', function() {
        var sqlUpdateExpected = 'UPDATE profiles SET profileName = \'' + profileArgs.profileName + '\' WHERE (profiles.profileId = 10) RETURNING profileId, profileName';

        return connection.persist(lodash.cloneDeep(updateRow)).then(function() {
          expect(sqlUpdatePassed).to.be.equal(sqlUpdateExpected);
        }).catch(function(err) {
          throw err;
        });
      });
    });
  });
});
