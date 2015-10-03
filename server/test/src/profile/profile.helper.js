'use strict';

var prepareLib   = require('../../libs/prepare.lib');
var profileModel = require('../../../src/profile/profile.model');

var ProfileHelper = {
  prepareProfile: function(args) {
    return prepareLib.make(profileModel, args);
  }
};

module.exports = ProfileHelper;
