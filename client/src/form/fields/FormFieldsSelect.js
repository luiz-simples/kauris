'use strict';

var React = require('react');

var FormFieldsSelect = React.createClass({
  render: function () {
    return(
      <div className="form-group has-success col-md-4">
        <label className="control-label">Select</label>
        <select className="form-control">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

        <p className="help-block">Example block-level help text here.</p>
      </div>
    );
  }
});

module.exports = FormFieldsSelect;
