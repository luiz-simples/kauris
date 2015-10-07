'use strict';

function ProfileUpdate(injector) {
  var service = this;

  service.save = function(profileArgs) {
    var lodash            = injector.lodash;
    var connection        = injector.connection;
    var profileModel      = lodash.cloneDeep(injector.profileModel);
    var profileValidation = injector.profileValidation;

    var deleteProfile = function(profile) {
      var attrs = Object.keys(profile);
      var where = [];

      profileModel.fields.forEach(function(field) {
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

      delete profileModel.fields;
      profileModel.action = 'delete';
      profileModel.where  = where;

      return connection.persist(profileModel);
    };

    return profileValidation
      .beforeDelete(profileArgs)
      .then(deleteProfile);
  };
}

module.exports = ProfileUpdate;
