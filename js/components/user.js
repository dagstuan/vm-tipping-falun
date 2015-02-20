import React from 'react';
import component from 'omniscient';

export default component('User', ({name}) => {
  return <div className="user">
    {name}
  </div>
}).jsx;
