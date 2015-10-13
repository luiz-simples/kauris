'use strict';

var q            = require('q');
var prepareLib   = require('../../libs/prepare.lib');
var ProfileModel = require('../../../src/profile/profile.model');

var ProfileHelper = {
  prepareProfile: function(args) {
    var profileModel = new ProfileModel();

    return prepareLib.make(profileModel, args);
  },

  prepareSearchProfile: function(profileArgs) {
    return q.Promise(function(resolve) {
      resolve({
        tableName: 'profiles',
        action: 'create',
        fields: [
          { attr: 'profileId',   kind: 'primary' },
          { attr: 'profileName', kind: 'name', value: profileArgs.profileName }
        ]
      });
    });
  },

  prepareCreateProfile: function(profileArgs) {
    return q.Promise(function(resolve) {
      resolve({
        tableName: 'profiles',
        action: 'create',
        fields: [
          { attr: 'profileId',   kind: 'primary' },
          { attr: 'profileName', kind: 'name', value: profileArgs.profileName }
        ]
      });
    });
  },

  prepareUpdateProfile: function(profileArgs) {
    return q.Promise(function(resolve) {
      resolve({
        tableName: 'profiles',
        action: 'update',
        fields: [
          { attr: 'profileId',   kind: 'primary' },
          { attr: 'profileName', kind: 'name', value: profileArgs.profileName }
        ],

        where: [
          { attr: 'profileId', kind: 'primary', value: profileArgs.profileId }
        ]
      });
    });
  },

  prepareDeleteProfile: function(profileArgs) {
    return q.Promise(function(resolve) {
      resolve({
        tableName: 'profiles',
        action: 'delete',

        where: [
          { attr: 'profileId', kind: 'primary', value: profileArgs.profileId }
        ]
      });
    });
  }
};

module.exports = ProfileHelper;
