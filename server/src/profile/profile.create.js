'use strict';

function ProfileCreate(injector) {
  var service = this;

  service.save = function(profileArgs) {
    var lodash            = injector.lodash;
    var connection        = injector.connection;
    var ProfileModel      = injector.ProfileModel;
    var ProfileValidation = injector.ProfileValidation;

    var profileModel      = new ProfileModel();
    var profileValidation = new ProfileValidation(injector);

    var saveProfile = function(profile) {
      var attrs = Object.keys(profile);

      var args = profileModel.fields.map(function(field) {
        var setField = lodash.cloneDeep(field);
        var filtered = attrs.indexOf(setField.attr) > -1;
        if (filtered) setField.value = profile[field.attr];
        return setField;
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
