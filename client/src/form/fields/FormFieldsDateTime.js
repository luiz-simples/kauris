'use strict';

var React = require('react');

var FormFieldsDateTime = React.createClass({
  render: function () {
    return(
      <div className="form-group has-success col-md-3">
        <label className="control-label" htmlFor="inputSuccess">Date and Time</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
          <input type="text" id="inputSuccess" className="form-control" placeholder="write here" />
        </div>
        <p className="help-block">Example block-level help text here.</p>
      </div>
    );
  }
});

module.exports = FormFieldsDateTime;
