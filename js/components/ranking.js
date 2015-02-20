import React from 'react';
import component from 'omniscient';

import User from './user';

export default component('Ranking', ({entries, competitions}) => {

  var ranking = entries.sort(desc);

  return <ul className="ranking">
    {ranking.toArray().map(entry =>
      <li>
        <h1><User user={entry} /></h1>
      </li>
    )}
  </ul>
}).jsx;

function desc (a, b) {
  return a.get('points') < b.get('points');
}
