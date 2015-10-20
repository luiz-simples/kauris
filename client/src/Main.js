/*globals document:false*/
'use strict';

var App         = require('./App');
var React       = require('react');
var ReactDom    = require('react-dom');
var myHistory   = require('history');
var ReactRouter = require('react-router');
var ProfileList = require('./profile/ProfileList');

var Route       = ReactRouter.Route;
var Router      = ReactRouter.Router;

var useBasename   = myHistory.useBasename;
var createHistory = myHistory.createHistory;

const history = useBasename(createHistory)({
  basename: ''
});

var render = function() {
  ReactDom.render((
    <Router history={history}>
      <Route path="/dashboard" component={App}>
        <Route path="/profiles" component={ProfileList} />
      </Route>
    </Router>
  ), document.getElementById('app'));
};

document.addEventListener('DOMContentLoaded', render);
