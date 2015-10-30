'use strict';

var React = require('react');

var stringInputCount = 0;

var formFieldtring = React.createClass({
  getInitialState: function() {
		return {
      dirty: false,
      valid: false
    };
	},

  handleChange: function(event) {
    var cfg = this.props.field;
    var className = '';
    var value = String(event.target.value || '').trim();
    var filled = value.length;
    if (!filled) value = undefined;
    if (filled) className = 'has-success';
    var valid = true;

    if (cfg.hasOwnProperty('validations') && cfg.validations.length) {
      for (var i = 0, c = cfg.validations.length; i < c; i++) {
        var validation = cfg.validations[i];
        var invalid = !validation.verify(value);
        if (invalid) {
          valid = false;
          break;
        }
      }
    }

    this.setState({
      dirty: true,
      valid: valid
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

    return(
      <div ref="containerField" className={className}>
        <label ref="labelField" className="control-label" htmlFor={htmlFor}>{cfg.label}</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-text-width"></i></span>
          <input readOnly={readOnly} ref="inputField" defaultValue={val} onChange={this.handleChange} type="text" className="form-control" id={htmlFor} placeholder={cfg.pĺace} />
        </div>
      </div>
    );
  }
});

module.exports = formFieldtring;
