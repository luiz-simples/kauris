'use strict';

var React   = require('react');
var Loading = require('../Loading');

var profileCols = [
  { attr: 'profileId',   type: 'primary', viewCol: true, viewFilter: false },
  { attr: 'profileName', type: 'name',    viewCol: true, viewFilter: false }
];

var profileRows = [
  { profileId: 1, profileName: 'Admin' },
  { profileId: 2, profileName: 'Guest' }
];

var ProfileList = React.createClass({
  getInitialState: function() {
		return {
      data: [],
      cols: profileCols,
      loaded: false,
    };
	},

  componentDidMount: function() {
    var profileList = this;

    setTimeout(function() {
      profileList.setState({
        data: [profileRows],
        loaded: true
      });

    }.bind(profileList), 2000);
  },

  render: function () {
    var trRows;
    var trLoading;
    var profileList = this;

    var state      = profileList.state;
    var rows       = state.data;
    var cols       = state.cols;
    var loaded     = Boolean(state.loaded);
    var othersCols = 1;
    var totalCols  = cols.length + othersCols;

    if (!loaded) {
      trLoading =
        <tr>
          <td colSpan={totalCols} style={{ textAlign: 'center', backgroundColor: '#fff' }}>
            <Loading />
          </td>
        </tr>
      ;
    }

    if (loaded) {
      var withData    = rows && rows.length;
      var withoutData = !withData;

      if (withoutData) {
        trRows = <tr>
          <td colSpan={totalCols} style={{ textAlign: 'center', backgroundColor: '#fff' }}>
            <section>
              <h4>Nenhuma informação encontrada.</h4>
            </section>
          </td>
        </tr>;
      }

      if (withData) {
        trRows = rows.map(function(row, tri) {
          var max = -1;
          var tds = cols.map(function(col, tdi) {
            max++;

            var contentTd = <i style={{ display: 'block', width: '100%', color: '#8A8A8A', textAlign: 'center' }}>vazio</i>;

            var withData = row.hasOwnProperty(col.attr) && row[col.attr];
            if (withData) contentTd = row[col.attr];

            return <td key={tdi}>{contentTd}</td>;
          });

          tds.push(<td key={++max} style={{ textAlign: 'center' }}>
            <button type="button" title="view" className="btn btn-default btn-primary" >
              <span className="glyphicon glyphicon-eye-open"></span>
            </button>
            &nbsp;
            <button type="button" title="edit" className="btn btn-default btn-success" >
              <span className="glyphicon glyphicon-pencil"></span>
            </button>
            &nbsp;
            <button type="button" title="delete" className="btn btn-default btn-danger" >
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </td>);

          return <tr key={tri}>{tds}</tr>;
        });
      }
    }

    return(
      <div id="wrapper">
        <h1 className="page-header">Profiles</h1>
        <div className="panel panel-default">
          <div className="panel-heading">
            <i className="fa fa-comments fa-fw"></i> Profiles List

            <div className="btn-group pull-right">
                <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <i className="fa fa-chevron-down"></i>
                </button>

                <ul className="dropdown-menu slidedown">
                    <li>
                        <a href="#">
                            <i className="fa fa-refresh fa-fw"></i> Refresh
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-check-circle fa-fw"></i> Available
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-times fa-fw"></i> Busy
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-clock-o fa-fw"></i> Away
                        </a>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <a href="#">
                            <i className="fa fa-sign-out fa-fw"></i> Sign Out
                        </a>
                    </li>
                </ul>
            </div>
          </div>

          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center', width: '75px' }}>Code</th>
                    <th>Profile</th>
                    <th style={{ textAlign: 'center', width: '150px' }}></th>
                  </tr>
                </thead>

                <tbody>
                  {trLoading}
                  {trRows}
                </tbody>
              </table>
            </div>

            <div className="text-right">
              <a href="#">View All Transactions <i className="fa fa-arrow-circle-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProfileList;
