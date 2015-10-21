/*globals $:false*/
'use strict';

var React = require('react');

var ListOptions = React.createClass({
  componentDidMount: function() {
    $(this.refs.listDropdownToggle).submenupicker();
  },

  render: function () {
    var listOptions = this;
    var cols = listOptions.props.cols;
    var viewCols = cols.map(function(col, index) {
      return <li key={index}>
        <div className="col-sm-offset-1">
          <div style={{ margin: '0 10px 5px 0' }} className="checkbox">
            <label>
              <input type="checkbox" /> {col.title}
            </label>

            <div className="pull-right">
              <button type="button" className="btn btn-default btn-xs pull-right">
                <i className="fa fa-caret-down"></i>
              </button>
              <button type="button" className="btn btn-default btn-xs pull-right">
                <i className="fa fa-caret-up"></i>
              </button>
            </div>
          </div>
        </div>
      </li>;
    });

    var viewFilters = cols.map(function(col, index) {
      return <li key={index}>
        <div className="col-sm-offset-1">
          <div style={{ margin: '0 10px 5px 0' }} className="checkbox">
            <label>
              <input type="checkbox" /> {col.title}
            </label>

            <div className="pull-right">
              <button type="button" className="btn btn-default btn-xs pull-right">
                <i className="fa fa-caret-down"></i>
              </button>
              <button type="button" className="btn btn-default btn-xs pull-right">
                <i className="fa fa-caret-up"></i>
              </button>
            </div>
          </div>
        </div>
      </li>;
    });

    return(
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-default btn-xs"
          title="add new"
          style={{ width: '30px' }}
        >
          <i className="fa fa-plus-square-o"></i>
        </button>

        <button
          type="button"
          ref="listDropdownToggle"
          className="btn btn-default btn-xs dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          title="config"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-cogs"></i>
        </button>

        <ul className="dropdown-menu dropdown-menu-right">
          <li className="dropdown-submenu">
            <a href="#">View cols</a>
            <ul className="dropdown-menu dropdown-menu-right">{viewCols}</ul>
          </li>

          <li className="dropdown-submenu">
            <a href="#">View filters</a>
            <ul className="dropdown-menu dropdown-menu-right">{viewFilters}</ul>
          </li>

          <li className="divider"></li>

          <li>
            <div style={{ margin: '0 0 0 10px' }} className="checkbox">
              <label>
                <input type="checkbox" /> Distinct
              </label>
            </div>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = ListOptions;
