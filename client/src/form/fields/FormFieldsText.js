'use strict';

var React = require('react');

var textInputCount = 0;

var FormFieldsText = React.createClass({
  handleChange: function(event) {
    var value = String(event.target.value || '').trim();
    if (!value.length) value = undefined;
    this.props.change(this.props.field, value);
  },

  render: function() {
    var cfg     = this.props.field;
    var val     = this.props.value;
    var htmlFor = 'text'.concat(++textInputCount);

    return(
      <div className="form-group has-success col-md-12">
        <label className="control-label" htmlFor={htmlFor}>{cfg.label}</label>
        <textarea defaultValue={val} onChange={this.handleChange} className="form-control" id={htmlFor} placeholder={cfg.pĺace} rows="9"></textarea>
      </div>
    );
  }
});

module.exports = FormFieldsText;
