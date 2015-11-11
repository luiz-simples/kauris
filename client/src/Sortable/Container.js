'use strict';

var React           = require('react');
var Card            = require('./Card');
var update          = require('react/lib/update');
var HTML5Backend    = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;

var style = {
  width: 400
};

var Container = React.createClass({
  getInitialState: function() {
    return {
      cards: [{
        id: 1,
        text: 'Write a cool JS library'
      }, {
        id: 2,
        text: 'Make it generic enough'
      }, {
        id: 3,
        text: 'Write README'
      }, {
        id: 4,
        text: 'Create some examples'
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
      }, {
        id: 6,
        text: '???'
      }, {
        id: 7,
        text: 'PROFIT'
      }]
    };
  },

  moveCard: function(dragIndex, hoverIndex) {
    var cards = this.state.cards;
    var dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
      }
    }));
  },

  render: function() {
    var container = this;
    var cards = container.state.cards;

    return (
      <div style={style}>
        {cards.map(function(card, i) {
          return (
            <Card key={card.id}
              index={i}
              id={card.id}
              text={card.text}
              moveCard={container.moveCard}
            />
          );
        })}
      </div>
    );
  }
});

module.exports = DragDropContext(HTML5Backend)(Container);
