/*globals $:false*/
'use strict';

var React = require('react');

var moneyInputCount = 0;

var FormFieldsMoney = React.createClass({
  handleChange: function(event) {
    var value = String(event.target.value || '').trim();
    if (!value.length) value = undefined;
    this.props.change(this.props.field, value);
  },

  componentDidMount: function() {
    var field = this;
    var input = $(field.refs.spinnerInput);

    $(this.refs.btnFirstOfType).on('click', function() {
      var val = (parseInt(input.val(), 10) || 0) + 1;
      input.val(val);
      field.handleChange({ target: { value: val }});
    });

    $(this.refs.btnLastOfType).on('click', function() {
      var val = (parseInt(input.val(), 10) || 0) - 1;
      input.val(val);
      field.handleChange({ target: { value: val }});
    });
  },

  render: function() {
    var cfg     = this.props.field;
    var val     = this.props.value;
    var htmlFor = 'primary'.concat(++moneyInputCount);

    return(
      <div className="form-group has-success col-sm-3 col-md-2">
        <label className="control-label" htmlFor={htmlFor}>{cfg.label}</label>
        <div className="input-group spinner">
          <span className="input-group-addon"><i className="fa fa-money"></i></span>
          <input defaultValue={val} ref="spinnerInput" onChange={this.handleChange} type="text" className="form-control" id={htmlFor} placeholder={cfg.pĺace} />
          <div className="input-group-btn-vertical">
            <button ref="btnFirstOfType" className="btn btn-default" type="button"><i className="fa fa-caret-up"></i></button>
            <button ref="btnLastOfType" className="btn btn-default" type="button"><i className="fa fa-caret-down"></i></button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FormFieldsMoney;
