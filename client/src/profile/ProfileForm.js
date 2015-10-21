'use strict';

var React         = require('react');
var lodash        = require('lodash');
var Form          = require('../form/Form');
var profileFields = require('./ProfileFields');
var orderForm     = 'orderForm';
var formFields    = lodash.sortBy(profileFields().filter(function(field) {
  return field.viewForm;
}), orderForm);

var ProfileForm = React.createClass({
  getInitialState: function() {
		return {
      model: {}
    };
	},

  render: function () {
    return <Form fields={formFields} model={this.state.model} />;
  }
});

module.exports = ProfileForm;
