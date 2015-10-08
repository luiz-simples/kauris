'use strict';

var prepareLib   = require('../../libs/prepare.lib');
var ProfileModel = require('../../../src/profile/profile.model');

var ProfileHelper = {
  prepareProfile: function(args) {
    var profileModel = new ProfileModel();

    return prepareLib.make(profileModel, args);
  }
};

module.exports = ProfileHelper;
