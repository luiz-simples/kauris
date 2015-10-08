'use strict';

function ProfileUpdate(injector) {
  var service = this;

  service.save = function(profileArgs) {
    var connection        = injector.connection;
    var ProfileModel      = injector.ProfileModel;
    var ProfileValidation = injector.ProfileValidation;

    var profileModel      = new ProfileModel();
    var profileValidation = new ProfileValidation(injector);

    var saveProfile = function(profile) {
      var attrs = Object.keys(profile);
      var where = [];

      var args = profileModel.fields.filter(function(field) {
        var filtered = attrs.indexOf(field.attr) > -1;

        if (filtered) {
          field.value = profile[field.attr];

          if (field.kind === 'primary') {
            where.push(field);
            filtered = false;
          }
        }

        return filtered;
      });

      profileModel.action = 'update';
      profileModel.fields = args;
      profileModel.where  = where;

      return connection.persist(profileModel);
    };

    return profileValidation
      .beforeSave(profileArgs)
      .then(saveProfile);
  };
}

module.exports = ProfileUpdate;
