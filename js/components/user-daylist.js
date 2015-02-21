import React from 'react';
import component from 'omniscient';

import Bet from './bet';

export default component('UserDayList', ({entry, competitions, date}) => {
  var competitionsToday = entry.get('bets').toArray().filter(function(bet, i) {
    return competitions.get(i).get('date') == date.getDate() + ".0" + (date.getMonth() + 1);
  });

  var competitionElems = competitionsToday.map(function(competition) {
    return <Bet bet={competition} competitions={competitions} />
  });

  return <div>
    {competitionElems}
  </div>
}).jsx;
