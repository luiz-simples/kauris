'use strict';

var ProfileModel = require('../profile/profile.model');

var UserModel = {
  tableName: 'users',
  fields: [
    { attr: 'userId',       kind: 'primary'  },
    { attr: 'userName',     kind: 'name'     },
    { attr: 'userCpf',      kind: 'cpf'      },
    { attr: 'userEmail',    kind: 'email'    },
    { attr: 'userPassword', kind: 'password' },
    { attr: 'userProfile',  kind: 'foreign', table: ProfileModel.tableName }
  ]
};

module.exports = UserModel;
