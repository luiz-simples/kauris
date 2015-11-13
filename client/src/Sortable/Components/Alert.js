'use strict';

var React = require('react');

var Alert = React.createClass({
  render: function() {
    var text = this.props.text;
    return (
      <div className="alert alert-success" role="alert">
        <strong>{text}</strong>
      </div>
    );
  }
});

module.exports = Alert;
