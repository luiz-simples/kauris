/*globals localStorage:false */
'use strict';

var menDB = {
  data: {},
  setItem: function(key, value) {
    this.data[key] = value;
    return this;
  },

  getItem: function(key) {
    return this.data.hasOwnProperty(key) ? this.data[key] : undefined;
  }
};

var localStorageApp;

try {
  if (localStorage)
    localStorageApp = localStorage;
} catch (e) {
  localStorageApp = menDB;
}

module.exports = localStorageApp;
