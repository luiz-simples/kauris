'use strict';

var List          = require('../list/List');
var React         = require('react');
var lodash        = require('lodash');
var profileFields = require('./ProfileFields');
var orderList     = 'orderList';
var profileCols   = lodash.sortBy(profileFields().filter(function(field) {
  return field.viewList;
}), orderList);

var profileRows = [
  { profileId: 1, profileName: 'Admin' },
  { profileId: 2, profileName: 'Guest' }
];

var ProfileList = React.createClass({
  getInitialState: function() {
		return {
      data: [],
      cols: profileCols,
      loaded: false,
    };
	},

  componentDidMount: function() {
    var profileList = this;

    setTimeout(function() {
      var isMounted = profileList.isMounted();
      if (!isMounted) return;

      profileList.setState({
        data: profileRows,
        loaded: true
      });
    }.bind(profileList), 2000);
  },

  render: function () {
    var profileList = this;

    var state  = profileList.state;
    var rows   = state.data;
    var cols   = state.cols;
    var loaded = Boolean(state.loaded);

    return <List loaded={loaded} cols={cols} data={rows} />;
  }
});

module.exports = ProfileList;
