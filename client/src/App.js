'use strict';

var Menu  = require('./Menu');
var React = require('react');

var App = React.createClass({
  render: function () {
    return(
      <div id="wrapper">
        <Menu />

        <div id="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
