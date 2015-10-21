'use strict';

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
      viewFilter: false
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
      viewFilter: false
    }
  ];
};
