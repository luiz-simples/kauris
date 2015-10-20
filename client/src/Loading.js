'use strict';

var React = require('react');

var Loading = React.createClass({

  render: function () {
    return(
      <section>
        <h4>Carregando informações. Aguarde.</h4>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped active"
            style={{ width: '100%' }}>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Loading;
