'use strict';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.translate = function() {
  var key = this;
  var degaultLang = 'en';

  var i18n = {
    en: {
      msgErrorRequired: 'This field is required.'
    },

    br: {
      msgErrorRequired: 'Este campo é obrigatório.'
    }
  };

  return i18n[degaultLang].hasOwnProperty(key) && i18n[degaultLang][key] ?
    i18n[degaultLang][key] :
    key;
};
