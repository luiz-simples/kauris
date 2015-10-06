'use strict';

var ConnectionMockLib = require('./libs/connection.mock.lib');

before(function() {
  this.connectionMockLib = new ConnectionMockLib();
});

// beforeEach(function(done) {
//   done();
// });

// afterEach(function(done) {
//   done();
// });

after(function() {
  this.connectionMockLib = undefined;
});
