import React from 'react';
import component from 'omniscient';

export default component('User', ({user}) =>
  <div className="user">
    {user.get('name')} ({user.get('points')})
  </div>
).jsx;
