'use strict';

var React = require('react');

var timeInputCount = 0;

var FormFieldTime = React.createClass({
  handleChange: function(event) {
    var value = String(event.target.value || '').trim();
    if (!value.length) value = undefined;
    this.props.change(this.props.field, value);
  },

  render: function() {
    var cfg     = this.props.field;
    var val     = this.props.value;
    var htmlFor = 'time'.concat(++timeInputCount);

    return(
      <div className="form-group has-success col-md-3">
        <label className="control-label" htmlFor={htmlFor}>{cfg.label}</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-clock-o"></i></span>
          <input defaultValue={val} onChange={this.handleChange} type="text" className="form-control" id={htmlFor} placeholder={cfg.pĺace} />
        </div>
      </div>
    );
  }
});

module.exports = FormFieldTime;
