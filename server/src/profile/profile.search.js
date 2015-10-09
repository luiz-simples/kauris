'use strict';

function ProfileSearch(injector) {
  var service = this;

  service.list = function(params) {
    var connection    = injector.connection;
    var ProfileModel  = injector.ProfileModel;
    var profileSearch = new ProfileModel();

    var page   = params.page   || 1;
    var where  = params.where  || [];
    var order  = params.order  || [];
    var limit  = params.limit  || 10;
    var fields = params.fields || profileSearch.fields;

    profileSearch.page   = page;
    profileSearch.order  = order;
    profileSearch.where  = where;
    profileSearch.limit  = limit;
    profileSearch.fields = fields;

    connection.search(profileSearch);
  };
}

module.exports = ProfileSearch;
