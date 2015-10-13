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
    describe('Delete record', function () {
      var deleteRow, connection, sqlDetelePassed;

      beforeEach(function() {
        sqlDetelePassed = '';
        var pgConnection = {
          runScript: function(sql) {
            return q.Promise(function(resolve) {
              sqlDetelePassed = sql;
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

        return profileHelper.prepareProfile().then(function(newProfileArgs) {
          newProfileArgs.profileId = 10;
          return newProfileArgs;
        }).then(profileHelper.prepareDeleteProfile).then(function(deleteProfile) {
          deleteRow = deleteProfile;
        });
      });

      it('should pass sql for delete record.', function() {
        var sqlDeleteExpected = 'DELETE FROM profiles WHERE (profiles.profileId = 10)';

        return connection.persist(lodash.cloneDeep(deleteRow)).then(function() {
          expect(sqlDeleteExpected).to.be.equal(sqlDetelePassed);
        }).catch(function(err) {
          throw err;
        });
      });
    });
  });
});
