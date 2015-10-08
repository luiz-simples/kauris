'use strict';

function ProfilePut(injector) {
  var request = this;

  request.route = '/profiles';
  request.verb  = injector.verbs.PUT;

  request.action = function(params) {
    var ProfileUpdate = injector.ProfileUpdate;
    var profileUpdate = new ProfileUpdate(injector);

    return profileUpdate.save(params);
  };
}

module.exports = ProfilePut;
