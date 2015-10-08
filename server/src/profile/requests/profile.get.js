'use strict';

function ProfileGet(injector) {
  var request = this;

  request.route = '/profiles';
  request.verb  = injector.verbs.GET;

  request.action = function(params) {
    var ProfileSearch = injector.ProfileSearch;
    var profileSearch = new ProfileSearch(injector);

    return profileSearch.list(params);
  };
}

module.exports = ProfileGet;
