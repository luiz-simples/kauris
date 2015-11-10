
'use strict';

var React = require('react');

var primaryInputCount = 0;

var FormFieldPrimary = React.createClass({
  render: function() {
    var cfg       = this.props.field;
    var val       = cfg.value ? '000000000'.concat(cfg.value).slice(-9) : undefined;
    var htmlFor   = 'primary'.concat(++primaryInputCount);
    var className = 'form-group col-md-2';

    return(
      <div ref='containerField' className={className}>
        <label ref='labelField' className='control-label' htmlFor={htmlFor}>
          {cfg.label}
        </label>

        <div className='input-group'>
          <span className='input-group-addon'><i className='fa fa-key'></i></span>
          <input
            id={htmlFor}
            ref='primaryField'
            readOnly={true}
            defaultValue={val}
            type='text'
            className='form-control'
            placeholder={cfg.pĺace}
          />
        </div>
      </div>
    );
  }
});

module.exports = FormFieldPrimary;
