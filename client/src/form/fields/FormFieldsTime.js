'use strict';

var React = require('react');

var FormFieldsTime = React.createClass({
  render: function () {
    return(
      <div className="form-group has-success col-md-3">
        <label className="control-label" htmlFor="inputSuccess">Time</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-clock-o"></i></span>
          <input type="text" id="inputSuccess" className="form-control" placeholder="write here" />
        </div>
        <p className="help-block">Example block-level help text here.</p>
      </div>
    );
  }
});

module.exports = FormFieldsTime;
