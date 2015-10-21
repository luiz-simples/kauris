'use strict';

var React       = require('react');
var Loading     = require('../Loading');
var ListOptions = require('../list/ListOptions');

var profileCols = [
  { attr: 'profileId',   title: 'Code',    kind: 'primary', viewCol: true, viewFilter: false },
  { attr: 'profileName', title: 'Profile', kind: 'name',    viewCol: true, viewFilter: false }
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
      var isMounted = profileList.isMounted();
      if (!isMounted) return;

      profileList.setState({
        data: profileRows,
        loaded: true
      });
    }.bind(profileList), 2000);
  },

  render: function () {
    var trRows;
    var trLoading;
    var profileList = this;

    var max        = 0;
    var state      = profileList.state;
    var rows       = state.data;
    var cols       = state.cols;
    var loaded     = Boolean(state.loaded);
    var othersCols = 1;
    var totalCols  = cols.length + othersCols;

    max = -1;
    var tableCols = cols.map(function(col, index) {
      if (index > max) max = index;
      var config = {};
      if (col.kind === 'primary') config.align = 'center';
      if (col.kind === 'primary') config.width = '75px';
      return <th key={index} style={config}>{col.title}</th>;
    }).concat([<th key={++max} style={{ textAlign: 'center', width: '100px' }}><ListOptions cols={cols} /></th>]);

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
        var actions = <div>
          <button type="button" title="view" className="btn btn-xs btn-default btn-primary" >
            <span className="glyphicon glyphicon-eye-open"></span>
          </button>
          &nbsp;
          <button type="button" title="edit" className="btn btn-xs btn-default btn-success" >
            <span className="glyphicon glyphicon-pencil"></span>
          </button>
          &nbsp;
          <button type="button" title="delete" className="btn btn-xs btn-default btn-danger" >
            <span className="glyphicon glyphicon-trash"></span>
          </button>
        </div>;

        trRows = rows.map(function(row, tri) {
          max = -1;
          var tds = cols.map(function(col, tdi) {
            max++;

            var contentTd = <i style={{ display: 'block', width: '100%', color: '#8A8A8A', textAlign: 'center' }}>vazio</i>;

            var withData = row.hasOwnProperty(col.attr) && row[col.attr];
            if (withData) contentTd = row[col.attr];

            return <td key={tdi}>{contentTd}</td>;
          });

          tds.push(<td key={++max} style={{ textAlign: 'center' }}>{actions}</td>);

          return <tr key={tri}>{tds}</tr>;
        });
      }
    }

    return (
      <div id="wrapper">
        <h1 className="page-header">Profiles</h1>
        <div className="panel panel-default">
          <div className="panel-heading">
            <i className="fa fa-lock fa-fw"></i> Profiles List
          </div>

          <div className="panel-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>{tableCols}</tr>
                </thead>

                <tbody>
                  {trLoading}
                  {trRows}
                </tbody>
              </table>
            </div>

            <nav>
              <ul className="pager pager-sm">
                <li><a href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ProfileList;
