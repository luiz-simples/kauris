'use strict';

var React = require('react');

var dateInputCount = 0;

var FormFieldsDate = React.createClass({
  handleChange: function(event) {
    var value = String(event.target.value || '').trim();
    if (!value.length) value = undefined;
    this.props.change(this.props.field, value);
  },

  render: function () {
    var cfg     = this.props.field;
    var val     = this.props.value;
    var htmlFor = 'date'.concat(++dateInputCount);

    return(
      <div className="form-group has-success col-md-3">
        <label className="control-label" htmlFor={htmlFor}>{cfg.label}</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
          <input defaultValue={val} onChange={this.handleChange} type="text" id={htmlFor} className="form-control" placeholder="write here" />
        </div>
      </div>
    );
  }
});

module.exports = FormFieldsDate;
