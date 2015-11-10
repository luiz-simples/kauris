'use strict';

var React = require('react');
var formField = require('./FormField');
var ValidationMessage = require('./validations/ValidationMessage');

var stringInputCount = 0;

var FormFieldString = React.createClass({
  getInitialState: formField.getInitialState,
  handleSetState:  formField.handleSetState,
  handleChange:    formField.handleChange,

  render: function() {
    var state     = this.state;
    var cfg       = this.props.field;
    var val       = cfg.value;
    var htmlFor   = 'string'.concat(++stringInputCount);
    var className = 'form-group col-md-6';
    var readOnly  = cfg.hasOwnProperty('readonly') && cfg.readonly;

    var fieldDirty = state.dirty;
    if (fieldDirty) {
      var classState = state.valid ? 'has-success' : 'has-error';
      className = className + ' ' + classState;
    }

    var messageField;
    var errorMessage = state.errorMessage;

    if (errorMessage) {
      var errorRef = state.errorRef;
      messageField = React.createElement(ValidationMessage, {
        ref: errorRef,
        type: 'danger',
        message: errorMessage
      });
    }

    return(
      <div ref='containerField' className={className}>
        <label ref='labelField' className='control-label' htmlFor={htmlFor}>
          {cfg.label}
        </label>

        <div className='input-group'>
          <span className='input-group-addon'><i className='fa fa-text-width'></i></span>
          <input
            id={htmlFor}
            ref='stringField'
            readOnly={readOnly}
            defaultValue={val}
            onChange={this.handleChange}
            type='text'
            className='form-control'
            placeholder={cfg.pĺace}
          />
        </div>

        {messageField}
      </div>
    );
  }
});

module.exports = FormFieldString;
