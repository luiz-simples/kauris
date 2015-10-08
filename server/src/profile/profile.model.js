'use strict';

function ProfileModel() {
  var model = this;

  model.tableName = 'profiles';
  model.fields = [
    { attr: 'profileId',   kind: 'primary' },
    { attr: 'profileName', kind: 'name'    }
  ];
}

module.exports = ProfileModel;
