'use strict';

var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactDND    = require('react-dnd');
var ItemTypes   = require('./ItemTypes');
var Tab         = require('./Components/Tab');
var Alert       = require('./Components/Alert');
var PropTypes   = React.PropTypes;
var DragSource  = ReactDND.DragSource;
var DropTarget  = ReactDND.DropTarget;
var findDOMNode = ReactDOM.findDOMNode;

var cardSource = {
  beginDrag: function(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

var cardTarget = {
  hover: function(props, monitor, component) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    var hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    var clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    var hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

var Card = React.createClass({
  propTypes: {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
  },

  render: function() {
    var id = this.props.id;
    var text = this.props.text;
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;
    var connectDropTarget = this.props.connectDropTarget;
    var style = {};

    if (isDragging) {
      style.border          = '1px dashed gray';
      style.backgroundColor = 'white';
      style.cursor          = 'move';
      style.opacity         = 0.45;
    }

    var Comp, className;
    if (id === 1) Comp = Alert;
    if (id === 2) Comp = Tab;
    if (id === 3) Comp = Alert;
    if (id === 4) Comp = Tab;
    if (id === 5) Comp = Alert;
    if (id === 6) Comp = Tab;
    if (id === 7) Comp = Alert;

    if (id === 1) className = 'col-md-4';
    if (id === 2) className = 'col-md-3';
    if (id === 3) className = 'col-md-3';
    if (id === 4) className = 'col-md-4';
    if (id === 5) className = 'col-md-3';
    if (id === 6) className = 'col-md-3';
    if (id === 7) className = 'col-md-4';

    return connectDragSource(connectDropTarget(
      <div className={className} style={style}>
        <Comp text={text} />
      </div>
    ));
  }
});

var CardDropTarget = DropTarget(ItemTypes.CARD, cardTarget, collectTarget)(Card);
var CardDragSource = DragSource(ItemTypes.CARD, cardSource, collectSource)(CardDropTarget);

module.exports = CardDragSource ;
