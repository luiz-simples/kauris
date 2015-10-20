'use strict';

var React       = require('react');
var ReactRouter = require('react-router');
var Link        = ReactRouter.Link;

var MenuLeft = React.createClass({
  render: function () {
    return (
      <div className="sidebar-nav navbar-collapse">
        <ul className="nav" id="side-menu">
          <li className="sidebar-search">
            <div className="input-group custom-search-form">
              <input type="text" className="form-control" placeholder="Search..." />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </li>

          <li>
            <Link to={'/'}><i className="fa fa-dashboard fa-fw"></i> Dashboard</Link>
          </li>

          <li>
            <a href=".">
              <i className="fa fa-bar-chart-o fa-fw"></i> Profiles<span className="fa arrow"></span>
            </a>

            <ul className="nav nav-second-level">
              <li>
                <Link to={'/profiles'}>Search</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = MenuLeft;
