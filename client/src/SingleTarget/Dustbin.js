'use strict';

var React      = require('react');
var lodash     = require('lodash');
var ItemTypes  = require('./ItemTypes');
var DropTarget = require('react-dnd').DropTarget;
var PropTypes  = React.PropTypes;

var style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left'
};

var boxTarget = {
  drop: function() {
    return { name: 'Dustbin' };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

var Dustbin = React.createClass({
  propTypes: {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  },

  render: function() {
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var connectDropTarget = this.props.connectDropTarget;
    var isActive = canDrop && isOver;

    var backgroundColor = 'darkred';
    if (isActive) backgroundColor = 'darkgreen';
    if (!isActive && canDrop) backgroundColor = 'darkblue';
    var dustbinStyle = {};

    lodash.assign(dustbinStyle, style, { backgroundColor: backgroundColor});

    return connectDropTarget(
      <div style={dustbinStyle}>
        { isActive ? 'Release to drop' : 'Drag a box here' }
      </div>
    );
  }
});

module.exports = DropTarget(ItemTypes.BOX, boxTarget, collect)(Dustbin);
