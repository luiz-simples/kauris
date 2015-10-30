'use strict';

var React = require('react');

var selectInputCount = 0;

var formFieldelect = React.createClass({
  handleChange: function(event) {
    var value = String(event.target.value || '').trim();
    if (!value.length) value = undefined;
    this.props.change(this.props.field, value);
  },

  render: function() {
    var cfg     = this.props.field;
    var val     = this.props.value;
    var htmlFor = 'select'.concat(++selectInputCount);

    return(
      <div className="form-group has-success col-md-4">
        <label className="control-label" htmlFor={htmlFor}>{cfg.label}</label>
        <select defaultValue={val} onChange={this.handleChange} className="form-control" id={htmlFor} placeholder={cfg.pĺace}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    );
  }
});

module.exports = formFieldelect;
