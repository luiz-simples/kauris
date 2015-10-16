/*globals document:false */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var KaurisClient = require('./components/KaurisClient.react');
ReactDOM.render(<KaurisClient />, document.getElementById('KaurisClient'));
