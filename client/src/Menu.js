'use strict';

var React    = require('react');
var MenuTop  = require('./MenuTop');
var MenuLeft = require('./MenuLeft');

var Menu = React.createClass({
  render: function () {
    return(
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html">SB Admin v2.0</a>
        </div>

        <MenuTop />

        <div className="navbar-default sidebar" role="navigation">
          <MenuLeft />
        </div>
      </nav>
    );
  }
});

module.exports = Menu;
