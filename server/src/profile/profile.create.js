'use strict';

function ProfileCreate(injector) {
  var service = this;

  service.save = function(profileArgs) {
    var lodash            = injector.lodash;
    var connection        = injector.connection;
    var profileModel      = lodash.cloneDeep(injector.profileModel);
    var profileValidation = injector.profileValidation;

    var saveProfile = function(profile) {
      var attrs = Object.keys(profile);

      var args  = profileModel.fields.filter(function(field) {
        var filtered = attrs.indexOf(field.attr) > -1;
        if (filtered) field.value = profile[field.attr];
        return filtered;
      });

      profileModel.action = 'insert';
      profileModel.fields = args;

      return connection.insert(profileModel);
    };

    return profileValidation
      .beforeSave(profileArgs)
      .then(saveProfile);
  };
}

module.exports = ProfileCreate;
