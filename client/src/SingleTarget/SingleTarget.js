'use strict';

var React = require('react');
var Container = require('./Container');

var SingleTarget = React.createClass({
  render: function() {
    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/01%20Dustbin/Single%20Target'>Browse the Source</a></b>
        </p>
        <p>
          This is the simplest example there is.
        </p>
        <p>
          Drag the boxes below and drop them into the dustbin.
          Note that it has a neutral, an active and a hovered state.
          The dragged item itself changes opacity while dragged.
        </p>
        <Container />
      </div>
    );
  }
});

module.exports = SingleTarget;
