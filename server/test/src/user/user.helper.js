'use strict';

var prepareLib   = require('../../libs/prepare.lib');
var userModel = require('../../../src/user/user.model');

var UserHelper = {
  prepareUser: function(args) {
    return prepareLib.make(userModel, args);
  }
};

module.exports = UserHelper;
