'use strict';

function ProfileCreate(injector) {
  var service = this;

  service.list = function(params) {
    var connection    = injector.connection;
    var ProfileModel  = injector.ProfileModel;
    var profileSearch = new ProfileModel();

    var page      = params.page  ||  1;
    var where     = params.where || [];
    var limitRows = params.limit || 15;

    profileSearch.page  = page;
    profileSearch.where = where;
    profileSearch.limit = limitRows;

    connection.searchByModel(profileSearch);
  };
}

module.exports = ProfileCreate;
