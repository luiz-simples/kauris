'use strict';

function ProfilePost(injector) {
  var request = this;

  request.route = '/profiles';
  request.verb  = injector.verbs.POST;

  request.action = function(params) {
    var ProfileCreate = injector.ProfileCreate;
    var profileCreate = new ProfileCreate(injector);

    return profileCreate.save(params);
  };
}

module.exports = ProfilePost;
