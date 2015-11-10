'use strict';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.translate = function() {
  var key = this;
  var degaultLang = 'en';

  var i18n = {
    en: {
      msgErrorRequired: 'This field is required.',
      msgErrorBiggerThan: 'This number is bigger than {0}.'
    },

    br: {
      msgErrorRequired: 'Este campo é obrigatório.',
      msgErrorBiggerThan: 'Este número é maior que {0}.'
    }
  };

  var keyKnown = Boolean(i18n[degaultLang].hasOwnProperty(key) && i18n[degaultLang][key]);
  if (!keyKnown) return key;

  var translate = i18n[degaultLang][key];

  if (arguments) {
    for(var arg in arguments) {
      var val = arguments[arg];
      var argReplace = new RegExp('\\{' + String(arg) + '\\}', 'g');
      translate = String(translate).replace(argReplace, val);
    }
  }

  return translate;
};
