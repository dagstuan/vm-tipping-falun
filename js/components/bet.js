import React from 'react';
import component from 'omniscient';

export default component('AllBets', ({bet, competitions}) => {
  return <div className="bet">
    <h2 className="competition-name">
      {competitions.get(bet.get('id')).get('name')}
    </h2>
    <ul>
      <li className="firstPlace">{bet.get('1')}</li>
      <li className="secondPlace">{bet.get('2')}</li>
      <li className="thirdPlace">{bet.get('3')}</li>
    </ul>
  </div>
}).jsx;
