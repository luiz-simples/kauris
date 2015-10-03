'use strict';

var ProfileModel = {
  tableName: 'profile',
  fields: [
    { attr: 'profileId',   kind: 'primary' },
    { attr: 'profileName', kind: 'name'    }
  ]
};

module.exports = ProfileModel;
