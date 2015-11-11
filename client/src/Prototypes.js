'use strict';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.translate = function() {
  var key = this;
  var degaultLang = 'en';

  var i18n = {
    en: {
      msgErrorEmail:         'This email is invalid.',
      msgErrorRequired:      'This field is required.',
      msgErrorLessThan:      'This number is less than {0}.',
      msgErrorBiggerThan:    'This number is bigger than {0}.',
      msgErrorMultipleEmail: 'This email is invalid: "{0}"'
    },

    br: {
      msgErrorEmail:         'Este e-mail é inválido.',
      msgErrorRequired:      'Este campo é obrigatório.',
      msgErrorLessThan:      'Este número é menor que {0}.',
      msgErrorBiggerThan:    'Este número é maior que {0}.',
      msgErrorMultipleEmail: 'Este e-mail é inválido: "{0}"'
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
