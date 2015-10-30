'use strict';

var React = require('react');

var primaryInputCount = 0;

var FormFieldPrimary = React.createClass({
  handleChange: function(event) {
    var value = String(event.target.value || '').trim();
    if (!value.length) value = undefined;
    this.props.change(this.props.field, value);
  },

  render: function() {
    var cfg     = this.props.field;
    var val     = this.props.value;
    var htmlFor = 'primary'.concat(++primaryInputCount);

    return(
      <div className="form-group col-md-2">
        <label className="control-label" htmlFor={htmlFor}>{cfg.label}</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-barcode"></i></span>
          <input defaultValue={val} onChange={this.handleChange} type="text" className="form-control" id={htmlFor} placeholder={cfg.pĺace} disabled />
        </div>
      </div>
    );
  }
});

module.exports = FormFieldPrimary;
