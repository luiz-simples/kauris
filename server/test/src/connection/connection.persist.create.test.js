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
    describe('Create record', function () {
      var createRow, connection, sqlCreatePassed, profileArgs;

      beforeEach(function() {
        sqlCreatePassed = '';

        var pgConnection = {
          runScript: function(sql) {
            return q.Promise(function(resolve) {
              sqlCreatePassed = sql;
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
          profileArgs = profilePrepared;
          return profileArgs;
        }).then(profileHelper.prepareCreateProfile).then(function(createProfile) {
          createRow = createProfile;
        });
      });

      it('should pass sql for create record.', function() {
        var sqlCreateExpected = 'INSERT INTO profiles (profileName) VALUES (\'' + profileArgs.profileName + '\') RETURNING profileId, profileName';

        return connection.persist(lodash.cloneDeep(createRow)).then(function() {
          expect(sqlCreatePassed).to.be.equal(sqlCreateExpected);
        }).catch(function(err) {
          throw err;
        });
      });
    });
  });
});
