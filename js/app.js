import fastclick from 'fastclick';
import React from 'react';
import component from 'omniscient';
import immstruct from 'immstruct';
import Immutable from 'immutable';
import Router from 'react-router';
let { Route, RouteHandler, DefaultRoute, Link } = Router;

import GoogleData from './googleData';

import '../less/app.less';

import AllBets from './components/all-bets';

let data = immstruct({
  entries: [],
  competitions: [],
  results: []
});

GoogleData(googleData => data.cursor().update(_ => Immutable.fromJS(googleData)));

var Layout = component(function () {
  return (
    <div className="layout">
      <div className="layout-header">
        <Link to="all-bets">
          <img src="images/logo.png" className="layout-logo" alt="logo"/>
        </Link>
      </div>
      <ul className="menu">
        <li className="menu-item"><Link to="all-bets">All Bets</Link></li>
      </ul>
      <div className="layout-content">
        <RouteHandler {...this.props}/>
      </div>
    </div>
  );
}).jsx;

var routes = (
  <Route handler={Layout}>
    <DefaultRoute handler={AllBets}/>
    <Route name="all-bets" handler={AllBets}/>
  </Route>
);

Router.run(routes, rerender(data, document.body));

fastclick(document.body);

function rerender (structure, el) {
  let Handler, state;

  function render (h, s) {
    if (h) Handler = h;
    if (s) state = s;

    React.render(<Handler
                 entries={data.cursor('entries')}
                 competitions={data.cursor('competitions')}
                 results={data.cursor('results')}
                 statics={state} />, el);
  }

  structure.on('swap', function() {
    render();
  });

  return render;
}
