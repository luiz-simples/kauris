'use strict';

var React = require('react');

var stringInputCount = 0;

var formFieldtring = React.createClass({
  getInitialState: function() {
		return {
      className: ''
    };
	},

  handleChange: function(event) {
    var cfg = this.props.field;
    var required = cfg.hasOwnProperty('required') && cfg.required;
    var className = '';
    var value = String(event.target.value || '').trim();
    var filled = value.length;
    if (!filled) value = undefined;

    if (filled) className = 'has-success';
    if (!filled && required) className = 'has-error';

    this.setState({
      className: className
    }, function() {
      cfg.change(cfg, value);
    });
  },

  render: function() {
    var cfg     = this.props.field;
    var val     = cfg.value;
    var htmlFor = 'string'.concat(++stringInputCount);

    var className = 'form-group col-md-6 '.concat(this.state.className || '');
    var readOnly  = cfg.hasOwnProperty('readonly') && cfg.readonly;

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
