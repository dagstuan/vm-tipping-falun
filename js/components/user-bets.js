import React from 'react';
import component from 'omniscient';

import Bet from './bet';

export default component('Bets', ({bets, competitions}) => {
  let betList = bets.toArray().map((bet, i) =>
    <div key={i} className="bet">
      <Bet bet={bet} competitions={competitions} />
    </div>
  );

  return <ul className="bets">
    {betList}
  </ul>
}).jsx;
