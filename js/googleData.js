import jsonp from 'jsonp';

module.exports = function(callback) {
  console.log('getting data!');
  jsonp('https://spreadsheets.google.com/feeds/list/1HaBpOgbo0uHEDc3zfFJx_XwI4y6ZGkX9I2Wtii0VhmE/1/public/values?alt=json-in-script', function(err, data){
    console.log(data);

    var entries = data.feed.entry.map(function(googleEntry) {
      var entry = {
        name: googleEntry.gsx$navn.$t
      }

      var medals = Object.keys(googleEntry)
      .filter(function(key) {
        return key.indexOf('gsx$plass_') != -1
      })
      .map(function(key) {
        return googleEntry[key].$t
      });

      entry.bets = [];
      while(medals.length > 0) {
        entry.bets.push({
          1: medals[0],
          2: medals[1],
          3: medals[2]
        });

        medals = medals.slice(3);
      }

      entry.medalCount = {
        gold: googleEntry.gsx$antallgull.$t,
        silver: googleEntry.gsx$antallsølv.$t,
        bronze: googleEntry.gsx$antallbronse.$t
      }

      return entry;
    });

    callback({
      entries: entries
    });
  });
}

