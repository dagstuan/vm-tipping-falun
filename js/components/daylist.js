import React from 'react';
import component from 'omniscient';

import UserSelect from './user-select';
import User from './user';
import UserDayList from './user-daylist';

export default component('DayList', ({entries, competitions, currentUser}) => {
  var currentUserEntry = entries.find(function(entry) {
    return entry.get('name') == currentUser.deref();
  });

  return <div>
    <h1 className="h2">Day list</h1>

    <UserSelect entries={entries} currentUser={currentUser} />

    <UserDayList entry={currentUserEntry} competitions={competitions} date={new Date()} />
  </div>
}).jsx;
