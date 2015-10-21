'use strict';

var React = require('react');

var typesFields = {
  text:    require('../form/fields/FormFieldsText'),
  time:    require('../form/fields/FormFieldsTime'),
  date:    require('../form/fields/FormFieldsDate'),
  email:   require('../form/fields/FormFieldsEmail'),
  money:   require('../form/fields/FormFieldsMoney'),
  select:  require('../form/fields/FormFieldsSelect'),
  string:  require('../form/fields/FormFieldsString'),
  integer: require('../form/fields/FormFieldsInteger'),
  percent: require('../form/fields/FormFieldsPercent'),
  primary: require('../form/fields/FormFieldsPrimary')
};

var ProfileForm = React.createClass({
  render: function () {
    var fields = Object.keys(typesFields).map(function(key, index) {
      var Field = typesFields[key];
      return <Field key={index} />;
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

module.exports = ProfileForm;
