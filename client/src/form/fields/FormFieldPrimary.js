'use strict';

require('../../Prototypes');

var React = require('react');
var ValidationMessage = require('./validations/ValidationMessage');

var stringInputCount = 0;

var FormFieldPrimary = React.createClass({
  getInitialState: function() {
		return {
      valid: true,
      dirty: false,
      errorName: undefined
    };
	},

  handleKeyDown: function(e) {
    console.log({
      which: e.which,
      keyCode: e.keyCode,
      charCode: e.charCode
    });

    var chrNum;
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
    if (keyNum >= iniNum && keyNum <= (iniNum+9)) chrNum = keyNum - iniNum;
    if (keyNum >= iniPad && keyNum <= (iniPad+9)) chrNum = keyNum - iniPad;
    if (chrNum === undefined) e.preventDefault();
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
    var htmlFor   = 'string'.concat(++stringInputCount);
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

        <div className='input-group'>
          <span className='input-group-addon'><i className='fa fa-key'></i></span>
          <input
            id={htmlFor}
            ref='primaryField'
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

module.exports = FormFieldPrimary;
