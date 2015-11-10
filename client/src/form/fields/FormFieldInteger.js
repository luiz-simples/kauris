'use strict';

var React = require('react');
var formField = require('./FormField');
var ValidationMessage = require('./validations/ValidationMessage');

var integerInputCount = 0;

var FormFieldInteger = React.createClass({
  getInitialState: formField.getInitialState,
  handleSetState:  formField.handleSetState,
  handleChange:    formField.handleChange,

  handleKeyDown: function(e) {
    var chrNum;
    var totDig =  9;
    var keyBck =  8;
    var keyTab =  9;
    var keyHom = 36;
    var keyEnd = 35;
    var keyDel = 45;
    var keyIns = 46;
    var keyEnt = 13;
    var keyUp  = 38;
    var keyDwn = 40;
    var keyPrr = 37;
    var keyNxt = 39;
    var iniNum = 48;
    var iniPad = 96;
    var keyNum = e.which || e.keyCode || e.charCode;

    var ctrl = [
      keyUp,
      keyDwn,
      keyPrr,
      keyNxt,
      keyHom,
      keyEnd,
      keyDel,
      keyIns,
      keyEnt,
      keyBck,
      keyTab
    ];

    if (ctrl.indexOf(keyNum) > -1) chrNum = keyNum;
    if (keyNum >= iniNum && keyNum <= (iniNum + totDig)) chrNum = keyNum - iniNum;
    if (keyNum >= iniPad && keyNum <= (iniPad + totDig)) chrNum = keyNum - iniPad;
    if (chrNum === undefined) e.preventDefault();
  },

  render: function() {
    var state     = this.state;
    var cfg       = this.props.field;
    var val       = cfg.value;
    var htmlFor   = 'string'.concat(++integerInputCount);
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
      messageField = React.createElement(ValidationMessage, {
        ref: errorRef,
        type: 'danger',
        message: errorRef.translate()
      });
    }

    return(
      <div ref='containerField' className={className}>
        <label ref='labelField' className='control-label' htmlFor={htmlFor}>
          {cfg.label}
        </label>

        <div className='input-group'>
          <span className='input-group-addon'><i className='fa fa-sort-numeric-asc'></i></span>
          <input
            id={htmlFor}
            ref='integerField'
            readOnly={readOnly}
            defaultValue={val}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
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

module.exports = FormFieldInteger;
