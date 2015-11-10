'use strict';

require('../../Prototypes');
var allPromises = require('q').all;

var FormField = {
  getInitialState: function() {
		return {
      valid: true,
      dirty: false,
      errorRef: undefined,
      errorMessage: undefined
    };
	},

  handleSetState: function(state, valueField) {
    var cfg = this.props.field;
    this.setState(state, function() {
      cfg.change(cfg, valueField);
    });
  },

  handleChange: function(event) {
    var cfg = this.props.field;
    var setState = this.handleSetState;

    var value  = String(event.target.value || '').trim();
    var notFilled = !value.length;
    if (notFilled) value = undefined;

    var state = { dirty: true, valid: true, errorMessage: undefined, errorRef: undefined };
    var validations = [];

    if (cfg.hasOwnProperty('validations') && cfg.validations.length) {
      validations = cfg.validations.map(function(validation) {
        return validation.verify(value);
      });
    }

    allPromises(validations).then(function() {
      setState(state, value);
    }).catch(function(error) {
      state.valid = false;
      state.errorRef = error.ref;
      state.errorMessage = error.message;
      setState(state);
    });
  }
};

module.exports = FormField;
