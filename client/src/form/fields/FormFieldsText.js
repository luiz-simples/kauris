'use strict';

var React = require('react');

var FormFieldsText = React.createClass({
  render: function () {
    return(
      <div className="form-group has-success col-md-12">
        <label className="control-label" htmlFor="inputSuccess">Text</label>
        <textarea className="form-control" rows="3"></textarea>
        <p className="help-block">Example block-level help text here.</p>
      </div>
    );
  }
});

module.exports = FormFieldsText;
