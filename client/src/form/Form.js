'use strict';

var React = require('react');

var typesFields = {
  date:     require('../form/fields/FormFieldDate'),
  datetime: require('../form/fields/FormFieldDateTime'),
  email:    require('../form/fields/FormFieldEmail'),
  integer:  require('../form/fields/FormFieldInteger'),
  money:    require('../form/fields/FormFieldMoney'),
  percent:  require('../form/fields/FormFieldPercent'),
  primary:  require('../form/fields/FormFieldPrimary'),
  select:   require('../form/fields/FormFieldSelect'),
  string:   require('../form/fields/FormFieldString'),
  text:     require('../form/fields/FormFieldText'),
  time:     require('../form/fields/FormFieldTime')
};

var Form = React.createClass({
  hangleChangeProperty: function(field, val) {
    this.props.model[field.attr] = val;
    console.log(this.props.model);
  },

  render: function () {
    var form = this;
    var model = form.props.model;

    var fields = this.props.fields.map(function(formField, index) {
      var Field = typesFields[formField.kind];
      var val   = null;

      if (model.hasOwnProperty(formField.attr))
        val = model[formField.attr];

      return <Field key={index} field={formField} value={val} change={form.hangleChangeProperty} />;
    });

    return (
      <div id="wrapper">
        <h3 className="page-header">Profiles</h3>
        <div className="panel panel-default">
          <div className="panel-heading">
            <i className="fa fa-lock fa-fw"></i> Profile Form
            <div style={{ display: 'block', backgroundColor: '#fff !important' }} className="pull-right">
              <button style={{ width: '75px' }} type="button" className="btn btn-xs btn-outline btn-success">Save</button>
              &nbsp;
              <button style={{ width: '75px' }} type="button" className="btn btn-xs btn-outline btn-danger">Cancel</button>
            </div>
          </div>

          <div className="panel-body">
            <div className="row">
              <div className="col-lg-12">
                <form role="form">
                  {fields}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Form;
