'use strict';

var React           = require('react');
var HTML5Backend    = require('react-dnd-html5-backend');
var BoxWithImage    = require('./BoxWithImage');
var BoxWithHandle   = require('./BoxWithHandle');
var DragDropContext = require('react-dnd').DragDropContext;

var Container = React.createClass({
  render: function() {
    return (
      <div>
        <div style={{ marginTop: '1.5rem' }}>
          <BoxWithHandle />
          <BoxWithImage />
        </div>
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(Container);
