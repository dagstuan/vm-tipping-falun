import React from 'react';
import component from 'omniscient';
import immstruct from 'immstruct';
import Immutable from 'immutable';

import GoogleData from './googleData';

import App from './app';
import '../less/index.less';

let data = immstruct({
  entries: [],
  competitions: []
});

GoogleData(function(googleData) {
  data.cursor().update(function(){
    return Immutable.fromJS(googleData);
  });
});

let render = () =>
  React.render(
    App({ entries: data.cursor('entries'), competitions: data.cursor('competitions') }),
    document.body);

render();
data.on('swap', render);

  // setInterval(
  //   () => data.cursor().update('counter', i => i + 1),
  //   1000);
