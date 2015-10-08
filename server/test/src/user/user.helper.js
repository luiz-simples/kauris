'use strict';

var prepareLib = require('../../libs/prepare.lib');
var UserModel  = require('../../../src/user/user.model');

var UserHelper = {
  prepareUser: function(args) {
    var userModel = new UserModel();
    return prepareLib.make(userModel, args);
  }
};

module.exports = UserHelper;
