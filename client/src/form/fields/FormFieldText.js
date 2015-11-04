'use strict';

require('../../Prototypes');

var React = require('react');
var ValidationMessage = require('./validations/ValidationMessage');

var stringInputCount = 0;

var FormFieldText = React.createClass({
  getInitialState: function() {
		return {
      valid: true,
      dirty: false,
      errorName: undefined
    };
	},

  handleChange: function(event) {
    var cfg = this.props.field;
    var className = '';
    var errorName = false;

    var value  = String(event.target.value || '').trim();
    var valid  = true;
    var filled = value.length;

    if (!filled) value = undefined;

    if (cfg.hasOwnProperty('validations') && cfg.validations.length) {
      for (var i = 0, c = cfg.validations.length; i < c; i++) {
        var validation = cfg.validations[i];
        var invalid = !validation.verify(value);

        if (invalid) {
          valid = false;
          errorName = validation.errorName;
          break;
        }
      }
    }

    if (valid) className = 'has-success';

    this.setState({
      dirty: true,
      valid: valid,
      errorName: errorName
    }, function() {
      cfg.change(cfg, value);
    });
  },

  render: function() {
    var state     = this.state;
    var cfg       = this.props.field;
    var val       = cfg.value;
    var htmlFor   = 'text'.concat(++stringInputCount);
    var className = 'form-group col-md-6';
    var readOnly  = cfg.hasOwnProperty('readonly') && cfg.readonly;

    var fieldDirty = state.dirty;
    if (fieldDirty) {
      var classState = state.valid ? 'has-success' : 'has-error';
      className = className + ' ' + classState;
    }

    var messageField;
    var errorName = state.errorName;

    if (errorName) {
      var errorRef = 'msgError'.concat(errorName.capitalize());
      messageField = <ValidationMessage
        ref={errorRef}
        type='danger'
        message={errorRef.translate()}
      />;
    }

    return(
      <div ref='containerField' className={className}>
        <label ref='labelField' className='control-label' htmlFor={htmlFor}>
          {cfg.label}
        </label>
        <textarea
          id={htmlFor}
          ref='textField'
          readOnly={readOnly}
          defaultValue={val}
          onChange={this.handleChange}
          className='form-control'
          placeholder={cfg.pĺace}
          rows="9">
        </textarea>

        {messageField}
      </div>
    );
  }
});

module.exports = FormFieldText;
