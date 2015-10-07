'use strict';

var ProfileModel = {
  tableName: 'profiles',
  fields: [
    { attr: 'profileId',   kind: 'primary' },
    { attr: 'profileName', kind: 'name'    }
  ]
};

module.exports = ProfileModel;
