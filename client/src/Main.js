/*globals document:false*/
'use strict';

var App         = require('./App');
var React       = require('react');
var ReactDom    = require('react-dom');
var myHistory   = require('history');
var ReactRouter = require('react-router');

var Sortable = require('./Sortable/Sortable');
var SingleTarget = require('./SingleTarget/SingleTarget');
var HandlesPreviews = require('./HandlesPreviews/HandlesPreviews');

var ProfileList = require('./profile/ProfileList');
var ProfileForm = require('./profile/ProfileForm');

var Route       = ReactRouter.Route;
var Router      = ReactRouter.Router;

var useBasename   = myHistory.useBasename;
var createHistory = myHistory.createHistory;

var history = useBasename(createHistory)({
  basename: ''
});

var newBase = document.createElement('base');
newBase.setAttribute('href', document.location.hostname);
document.getElementsByTagName('head')[0].appendChild(newBase);

var render = function() {
  ReactDom.render((
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='/SingleTarget' component={SingleTarget} />
        <Route path='/HandlesPreviews' component={HandlesPreviews} />
        <Route path='/Sortable' component={Sortable} />
        <Route path='/profiles' component={ProfileList} />
        <Route path='/profiles/new' component={ProfileForm} />
      </Route>
    </Router>
  ), document.getElementById('app'));
};

document.addEventListener('DOMContentLoaded', render);
