import React from 'react';
import component from 'omniscient';

export default component('DayList', ({entries, currentUser}) => {
  var options = entries.map(function(entry, i) {
    var name = entry.get('name');

  	return <option key={i} value={name}>{name}</option>
  }).toArray();

  var handleChange = function(event) {
    var newUser = entries.find(function(entry) {
      return entry.get('name') == event.target.value;
    });

    currentUser.update(() => newUser.get('name'));
  }
  
  return <select value={currentUser.deref()} onChange={handleChange}>{options}</select>
}).jsx;
