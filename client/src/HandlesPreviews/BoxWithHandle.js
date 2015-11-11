'use strict';

var React      = require('react');
var lodash     = require('lodash');
var ItemTypes  = require('./ItemTypes');
var DragSource = require('react-dnd').DragSource;
var PropTypes  = React.PropTypes;

var style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  width: '20rem'
};

var handleStyle = {
  backgroundColor: 'green',
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  marginRight: '0.75rem',
  cursor: 'move'
};

var boxSource = {
  beginDrag: function() {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

var BoxWithHandle = React.createClass({
  propTypes: {
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired
  },

  render: function() {
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;
    var connectDragPreview = this.props.connectDragPreview;
    var opacity = isDragging ? 0.4 : 1;
    var boxWithHandleStyle = {};

    lodash.assign(boxWithHandleStyle, style, { opacity: opacity});

    return connectDragPreview(
      <div style={boxWithHandleStyle}>
        {connectDragSource(<div style={handleStyle} />)}
        Drag me by the handle
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.BOX, boxSource, collect)(BoxWithHandle);
