import React from 'react';
import component from 'omniscient';

import UserSelect from './user-select';
import User from './user';
import UserBetList from './user-betlist';

export default component('TodaysBets', ({entries, competitions, currentUser}) => {
  var currentUserEntry = entries.find(function(entry) {
    return entry.get('name') == currentUser.deref();
  });

  return <div>
    <h1 className="h2">Todays bets</h1>

    <UserSelect entries={entries} currentUser={currentUser} />

    <UserBetList entry={currentUserEntry} competitions={competitions} date={new Date()} />
  </div>
}).jsx;
