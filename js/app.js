import FastClick from 'fastclick';
import React from 'react';
import component from 'omniscient';
import immstruct from 'immstruct';
import Immutable from 'immutable';
import Router from 'react-router';
let { Route, RouteHandler, DefaultRoute, Link } = Router;

import GoogleData from './googleData';

import '../less/app.less';

import AllBets from './components/all-bets';
import Ranking from './components/ranking';
import TodaysBets from './components/todays-bets';

const CachedDataKey = 'vm-falun-data';
let cachedData = localStorage.getItem(CachedDataKey);
let cachedJson;
if (cachedData) {
  try {
    cachedJson = JSON.parse(cachedData);
  }
  catch (e) {
    localStorage.removeItem(CachedDataKey);
  }
}

var InitialData = cachedJson || {
  entries: [],
  competitions: [],
  results: [],
  currentUser: ''
};

let data = immstruct(InitialData);

GoogleData(googleData => {
  googleData['currentUser'] = 'Eivind'

  data.cursor().update(_ => Immutable.fromJS(googleData));
  localStorage.setItem(CachedDataKey, JSON.stringify(googleData));
});

var AlwaysRerender = [{ shouldComponentUpdate: () => true }];
var Layout = component(AlwaysRerender, function () {
  return (
    <div className="layout">
      <div className="layout-header">
        <Link to="ranking">
          <img src="images/logo.png" className="layout-logo" alt="logo"/>
        </Link>
      </div>
      <ul className="menu">
        <li className="menu-item"><Link to="ranking">Ranking</Link></li>
        <li className="menu-item"><Link to="all-bets">All Bets</Link></li>
        <li className="menu-item"><Link to="todays-bets">Todays bets</Link></li>
      </ul>
      <div className="layout-content">
        <RouteHandler {...this.props}/>
      </div>
    </div>
  );
}).jsx;

var routes = (
  <Route handler={Layout}>
    <DefaultRoute handler={Ranking}/>
    <Route name="all-bets" handler={AllBets}/>
    <Route name="ranking" handler={Ranking}/>
    <Route name="todays-bets" handler={TodaysBets}/>
  </Route>
);

Router.run(routes, rerender(data, document.body));

FastClick.attach(document.body);

function rerender (structure, el) {
  let Handler, state;

  function render (h, s) {
    if (h) Handler = h;
    if (s) state = s;

    React.render(<Handler
                 entries={data.cursor('entries')}
                 competitions={data.cursor('competitions')}
                 results={data.cursor('results')}
                 currentUser={data.cursor('currentUser')}
                 statics={state} />, el);
  }

  structure.on('swap', function() {
    render();
  });

  return render;
}
