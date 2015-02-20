import React from 'react';
import component from 'omniscient';

import User from './user';
import UserBets from './user-bets';

export default component('AllBets', ({entries, competitions}) => {
  let allUsers = entries.toArray().map((entry, i) =>
    <div key={i}>
      <h1><User user={entry} /></h1>
      <UserBets
        bets={entry.get('bets')}
        competitions={competitions} />
    </div>
  );

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
