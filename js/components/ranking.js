import React from 'react';
import component from 'omniscient';

import User from './user';

export default component('Ranking', ({entries}) => {

  var ranking = entries.deref().sort((a, b) =>
                                    a.get('points') < b.get('points'));

  return <ul className="ranking">
    {ranking.toArray().map((entry, i) =>
      <li className="rank" key={i}>
        <h1 className="h2"><User user={entry} /></h1>
      </li>
    )}
  </ul>
}).jsx;

