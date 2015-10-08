'use strict';

function ProfileDelete(injector) {
  var request = this;

  request.route = '/profiles';
  request.verb  = injector.verbs.DELETE;

  request.action = function(params) {
    var ProfileRemove = injector.ProfileDelete;
    var profileRemove = new ProfileRemove(injector);

    return profileRemove.save(params);
  };
}

module.exports = ProfileDelete;
