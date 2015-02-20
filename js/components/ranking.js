import React from 'react';
import component from 'omniscient';

import User from './user';

export default component('Ranking', ({entries}) => {

  var ranking = entries.deref().sortBy(
    (value, key, iter) => value.get('points'),
    (a, b) => a < b);

  return <ul className="ranking">
    {ranking.toArray().map(entry =>
      <li className="rank">
        <h1><User user={entry} /></h1>
      </li>
    )}
  </ul>
}).jsx;

