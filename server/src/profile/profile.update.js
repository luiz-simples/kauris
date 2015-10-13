'use strict';

function ProfileUpdate(injector) {
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
      var where = [];

      var args = profileModel.fields.map(function(field) {
        var setField  = lodash.cloneDeep(field);
        var filtered  = attrs.indexOf(setField.attr) > -1;
        var isPrimary = field.kind === 'primary';

        if (filtered)  setField.value = profile[field.attr];
        if (isPrimary) where.push(lodash.cloneDeep(setField));
        if (isPrimary) delete setField.value;

        return setField;
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
