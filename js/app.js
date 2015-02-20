import React from 'react';
import component from 'omniscient';
import User from './user';
import Bets from './bets';

export default component('App', ({entries, competitions}) => {
  var allUsers = entries.map(function(entry){
    return <div>
      <User name={entry.get('name')} />
      <Bets bets={entry.get('bets')} competitions={competitions} />
    </div>
  }).toArray();

  return <div className="faluntipping">
    {allUsers}
  </div>
});


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
