'use strict';

var React = require('react');

var FormFieldsPrimary = React.createClass({
  render: function () {
    return(
      <div className="form-group has-success col-sm-3 col-md-2">
        <label className="control-label" htmlFor="inputSuccess">Primary</label>
        <div className="input-group spinner">
          <span className="input-group-addon"><i className="fa fa-barcode"></i></span>
          <input disabled="disabled" ref="spinnerInput" type="text" id="inputSuccess" className="form-control" placeholder="write here" />
        </div>
        <p className="help-block">Example block-level help text here.</p>
      </div>
    );
  }
});

module.exports = FormFieldsPrimary;
