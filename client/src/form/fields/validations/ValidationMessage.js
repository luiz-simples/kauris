'use strict';

var React = require('react');

var ValidationMessage = React.createClass({
  render: function () {
    var type = this.props.type;
    var msgn = this.props.message;

    var className = 'alert alert-'.concat(type);
    return <div className={className}>{msgn}</div>;
  }
});

module.exports = ValidationMessage;
