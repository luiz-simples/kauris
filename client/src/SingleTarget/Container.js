'use strict';

var Box             = require('./Box');
var Dustbin         = require('./Dustbin');
var React           = require('react');
var HTML5Backend    = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;

var Container = React.createClass({
  render: function() {
    return (
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Dustbin />
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Box name='Glass' />
          <Box name='Banana' />
          <Box name='Paper' />
        </div>
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(Container);
