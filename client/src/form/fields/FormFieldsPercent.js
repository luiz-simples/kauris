/*globals $:false*/
'use strict';

var React = require('react');

var FormFieldsPercent = React.createClass({
  componentDidMount: function() {
    var input = $(this.refs.spinnerInput);

    $(this.refs.btnFirstOfType).on('click', function() {
      input.val((parseInt(input.val(), 10) || 0) + 1);
    });

    $(this.refs.btnLastOfType).on('click', function() {
      input.val((parseInt(input.val(), 10) || 0) - 1);
    });
  },

  render: function () {
    return(
      <div className="form-group has-success col-sm-3 col-md-2">
        <label className="control-label" htmlFor="inputSuccess">Percent</label>
        <div className="input-group spinner">
          <span className="input-group-addon">%</span>
          <input ref="spinnerInput" type="text" id="inputSuccess" className="form-control" placeholder="write here" />
          <div className="input-group-btn-vertical">
            <button ref="btnFirstOfType" className="btn btn-default" type="button"><i className="fa fa-caret-up"></i></button>
            <button ref="btnLastOfType" className="btn btn-default" type="button"><i className="fa fa-caret-down"></i></button>
          </div>
        </div>
        <p className="help-block">Example block-level help text here.</p>
      </div>
    );
  }
});

module.exports = FormFieldsPercent;
