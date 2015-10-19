/*globals document:false*/
'use strict';

var React    = require('react');
var ReactDom = require('react-dom');

var App = React.createClass({
  render: function () {
    return <div>Testando</div>;
  }
});

var renderApp = function () {
  ReactDom.render(<App />, document.getElementById('app'));
};

document.addEventListener('DOMContentLoaded', renderApp);
