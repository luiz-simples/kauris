'use strict';

var React      = require('react');
var lodash     = require('lodash');
var ItemTypes  = require('./ItemTypes');
var DragSource = require('react-dnd').DragSource;
var PropTypes  = React.PropTypes;

var style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

var boxSource = {
  beginDrag: function(props) {
    return {
      name: props.name
    };
  },

  endDrag: function(props, monitor) {
    var item = monitor.getItem();
    var dropResult = monitor.getDropResult();
    if (dropResult) console.log('You dropped ' + item.name + ' into ' + dropResult.name + '!');
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var Box = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  },

  render: function() {
    var name = this.props.name;
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;
    var opacity = isDragging ? 0.4 : 1;
    var boxStyle = {};

    lodash.assign(boxStyle, style, { opacity: opacity });

    return connectDragSource(<div style={boxStyle}>{name}</div>);
  }
});

module.exports = DragSource(ItemTypes.BOX, boxSource, collect)(Box);
