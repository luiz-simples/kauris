'use strict';

var ValidationRequired   = require('../form/fields/validations/ValidationRequired');
var ValidationLessThan   = require('../form/fields/validations/ValidationLessThan');
var ValidationBiggerThan = require('../form/fields/validations/ValidationBiggerThan');

module.exports = function() {
  return [
    {
      attr:  'profileId',
      kind:  'primary',
      title: 'Code',
      label: 'Code',
      pĺace: '######',

      orderForm: 1,
      orderList: 1,

      listView: true,
      viewForm: true,

      viewColumn: true,
      viewFilter: false,

      validations: [
        new ValidationRequired()
      ]
    },

    {
      attr:  'profileName',
      kind:  'string',
      title: 'Profile',
      label: 'Profile',
      pĺace: 'Write profile name here!',

      orderForm: 2,
      orderList: 2,

      viewForm: true,
      viewList: true,

      viewColumn: true,
      viewFilter: false,

      validations: [
        new ValidationRequired()
      ]
    },

    {
      attr:  'profileDescription',
      kind:  'text',
      title: 'Description',
      label: 'Description',
      pĺace: 'Write a description profile!',

      orderForm: 3,
      orderList: 3,

      viewForm: true,
      viewList: true,

      viewColumn: true,
      viewFilter: false,

      validations: [
        new ValidationRequired()
      ]
    },

    {
      attr:  'profilePriority',
      kind:  'integer',
      title: 'Priority',
      label: 'Priority',
      pĺace: 'Fill priority profile!',

      orderForm: 4,
      orderList: 4,

      viewForm: true,
      viewList: true,

      viewColumn: true,
      viewFilter: false,

      validations: [
        new ValidationRequired(),
        new ValidationLessThan(10),
        new ValidationBiggerThan(100)
      ]
    }
  ];
};
