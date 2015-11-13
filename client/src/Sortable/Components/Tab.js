/*globals $:false*/
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Tab = React.createClass({
  componentDidMount: function() {
    var comp = $(ReactDOM.findDOMNode(this));

    var tabs = comp.find('ul').first();
    var cont = comp.find('div.tab-content').first();
    //
    tabs.find('a[data-tab-ref]').off('click').on('click', function(e) {
      e.preventDefault();
      var tabRef = $(this).attr('data-tab-ref');
      cont.find('div[data-tab-ref].active').removeClass('active').removeClass('in');
      cont.find('div[data-tab-ref="' + tabRef + '"]').addClass('active').addClass('in');
    });
  },

  render: function() {
    return (
      <div>
        <ul className="nav nav-tabs" role="tablist">
          <li role="presentation" className=""><a href data-tab-ref={'tab-home'} role="tab" data-toggle="tab" aria-expanded="false">Home</a></li>
          <li role="presentation" className=""><a href data-tab-ref={'tab-prof'} role="tab" data-toggle="tab" aria-expanded="false">Profile</a></li>
          <li role="presentation" className="dropdown active">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Dropdown <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li className="active"><a href data-tab-ref={'tab-fat'} role="tab" data-toggle="tab" aria-expanded="true">@fat</a></li>
              <li className="">      <a href data-tab-ref={'tab-mdo'} role="tab" data-toggle="tab" aria-expanded="false">@mdo</a></li>
            </ul>
          </li>
        </ul>

        <div className="tab-content">
          <div data-tab-ref={'tab-home'} role="tabpanel" className="tab-pane fade">
            <p>HOME:: Raw denim you probably havent heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
          </div>
          <div data-tab-ref={'tab-prof'} role="tabpanel" className="tab-pane fade">
            <p>PROFILE:: Food truck fixie locavore, accusamus mcsweeneys marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
          </div>
          <div data-tab-ref={'tab-fat'} role="tabpanel" className="tab-pane fade active in">
            <p>FAT:: Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeneys organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably havent heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
          </div>
          <div data-tab-ref={'tab-mdo'} role="tabpanel" className="tab-pane fade">
            <p>MDO:: Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater. Lomo wolf viral, mustache readymade thundercats keffiyeh craft beer marfa ethical. Wolf salvia freegan, sartorial keffiyeh echo park vegan.</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Tab;
