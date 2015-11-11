'use strict';

var React = require('react');
var Container = require('./Container');

var Builder = React.createClass({
  render: function() {
    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/05%20Customize/Handles%20and%20Previews'>Browse the Source</a></b>
        </p>
        <p>
          React DnD lets you choose the draggable node, as well as the drag preview node in your components <code>render</code> function.
          You may also use an <a href='https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image'><code>Image</code></a> instance that you created programmatically once it has loaded.
        </p>
        <Container />
      </div>
    );
  }
});

module.exports = Builder;
