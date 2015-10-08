'use strict';

function ProfileCreate(injector) {
  var service = this;

  service.save = function(profileArgs) {
    var connection        = injector.connection;
    var ProfileModel      = injector.ProfileModel;
    var ProfileValidation = injector.ProfileValidation;

    var profileModel      = new ProfileModel();
    var profileValidation = new ProfileValidation(injector);

    var saveProfile = function(profile) {

      var attrs = Object.keys(profile);

      var args = profileModel.fields.filter(function(field) {
        var filtered = attrs.indexOf(field.attr) > -1;
        if (filtered) field.value = profile[field.attr];
        return filtered;
      });

      profileModel.action = 'create';
      profileModel.fields = args;

      return connection.persist(profileModel);
    };

    return profileValidation
      .beforeSave(profileArgs)
      .then(saveProfile);
  };
}

module.exports = ProfileCreate;
