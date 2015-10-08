'use strict';

var ProfileModel = require('../profile/profile.model');

function UserModel() {
  var model        = this;
  var profileModel = new ProfileModel();

  model.tableName = 'users';
  model.fields = [
    { attr: 'userId',       kind: 'primary'  },
    { attr: 'userName',     kind: 'name'     },
    { attr: 'userCpf',      kind: 'cpf'      },
    { attr: 'userEmail',    kind: 'email'    },
    { attr: 'userPassword', kind: 'password' },
    { attr: 'userProfile',  kind: 'foreign', table: profileModel.tableName }
  ];
}

module.exports = UserModel;
