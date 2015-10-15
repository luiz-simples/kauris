'use strict';

var q             = require('q');
var squel         = require('squel');
var lodash        = require('lodash');
var expect        = require('chai').expect;
var srcKauris     = '../../../src/';
var Connection    = require(srcKauris.concat('connection'));
var ProfileModel  = require(srcKauris.concat('profile/profile.model'));

describe('Connection', function() {
  describe('#search', function () {
    describe('List records', function () {
      var searchRows, connection, sqlSearchPassed;

      beforeEach(function() {
        sqlSearchPassed = '';

        var pgConnection = {
          runScript: function(sql) {
            return q.Promise(function(resolve) {
              sqlSearchPassed = sql;
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

        searchRows       = new ProfileModel();
        searchRows.page  = 10;
        searchRows.limit = 25;

        searchRows.fields = [
          { attr: 'profileId',   kind: 'primary' },
          { attr: 'profileName', kind: 'string' }
        ];

        searchRows.where = [
          { attr: 'profileId',   kind: 'primary', value: 404,    comparator: '=' },
          { attr: 'profileName', kind: 'string',  value: 'test', comparator: 'like' }
        ];

        searchRows.order = [
          { attr: 'profileId',   kind: 'primary', order: 'ASC'  },
          { attr: 'profileName', kind: 'string',  order: 'DESC' }
        ];
      });

      it('should pass sql for search records.', function() {
        var sqlSearchExpected = 'SELECT profiles.profileId, profiles.profileName FROM profiles WHERE (profiles.profileId = 404) AND (profiles.profileName like \'test\') ORDER BY profiles.profileId ASC, profiles.profileName DESC LIMIT 25 OFFSET 225';

        return connection.search(searchRows).then(function() {
          expect(sqlSearchPassed).to.be.equal(sqlSearchExpected);
        }).catch(function(err) {
          throw err;
        });
      });
    });
  });
});
