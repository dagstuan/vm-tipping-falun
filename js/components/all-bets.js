import React from 'react';
import component from 'omniscient';

import User from './user';
import UserBets from './user-bets';

export default component('AllBets', ({entries, competitions}) => {
  var allUsers = entries.map(function(entry, i){
    return <div key={i}>
      <User name={entry.get('name')} />
      <UserBets bets={entry.get('bets')} competitions={competitions} />
    </div>
  }).toArray();

  return <div className="faluntipping">
    {allUsers}
  </div>
}).jsx;


// or with jsx:
//
// <div className="app">
//   {counter.deref()}
// </div>);
//
// just remember to:
//
// import React from 'react';


// enable 6to5-loader?experimental to use generators etc.
// export function * counter () {
//   var n = 0;
//   while (true) yield n++;
// }
