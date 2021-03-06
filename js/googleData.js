import jsonp from 'jsonp';

module.exports = function(callback) {
  console.log('getting data!');
  jsonp('https://spreadsheets.google.com/feeds/list/1HaBpOgbo0uHEDc3zfFJx_XwI4y6ZGkX9I2Wtii0VhmE/1/public/values?alt=json-in-script', function(err, googleBets){
    jsonp('https://spreadsheets.google.com/feeds/list/1HaBpOgbo0uHEDc3zfFJx_XwI4y6ZGkX9I2Wtii0VhmE/3/public/values?alt=json-in-script', function(err, googleResults){

      var allResults = googleResults.feed.entry.map(function(googleResult) {
        return googleResult.gsx$resultat.$t;
      });

      var results = [];

      var competitionId = 0;
      while(allResults.length > 0) {
        results.push({
          id: competitionId,
          1: allResults[0],
          2: allResults[1],
          3: allResults[2]
        });

        competitionId++;
        allResults = allResults.slice(3);
      }

      var entries = googleBets.feed.entry.map(function(googleEntry) {
        var entry = {
          name: googleEntry.gsx$navn.$t
        }

        var medals = Object.keys(googleEntry)
        .filter(function(key) {
          return key.indexOf('gsx$plass') != -1
        })
        .map(function(key) {
          return googleEntry[key].$t
        });

        entry.bets = [];

        var competitionId = 0;
        while(medals.length > 0) {
          entry.bets.push({
            id: competitionId,
            1: medals[0],
            2: medals[1],
            3: medals[2]
          });

          competitionId++;

          medals = medals.slice(3);
        }

        entry.medalCount = {
          gold: googleEntry.gsx$antallgull.$t,
          silver: googleEntry.gsx$antallsølv.$t,
          bronze: googleEntry.gsx$antallbronse.$t
        }

        entry.points = results.reduce((acc, rank, i) => {
          var isNotDone = rank[1] == '';
          if (isNotDone){
            return acc;
          }

          let points = acc;
          var bet = entry.bets[i];

          var pointsForCorrectPlace = n => {
            if (bet[n] == rank[n]) {
              return 3;
            }
            return 0;
          };

          var pointsForAmongTopThree = n => {
            var ranks = [1, 2, 3];
            ranks.splice(ranks.indexOf(n), 1)
            for (var i = 0; i < ranks.length; i++) {
              var rankNum = ranks[i];
              var eachRank = rank[rankNum];
              if (bet[n] == eachRank) {
                return 1;
              }
            }
            return 0;
          };

          points += pointsForCorrectPlace(1);
          points += pointsForCorrectPlace(2);
          points += pointsForCorrectPlace(3);

          points += pointsForAmongTopThree(1);
          points += pointsForAmongTopThree(2);
          points += pointsForAmongTopThree(3);

          return points;
        }, 0);

        return entry;
      });

      callback({
        entries: entries,
        results: results,
        competitions: [
        {
          name: "Sprint kvinner",
          date: "19.02"
        },{
          name: "Sprint menn",
          date: "19.02"
        },{
          name: "Kombinert 100 + 10km",
          date: "20.02"
        },{
          name: "Hopp kvinner HS 100",
          date: "20.02"
        },{
          name: "15 km skiathlon kvinner",
          date: "21.02"
        },{
          name: "30 km skiathlon menn",
          date: "21.02"
        },{
          name: "Hopp HS 100",
          date: "21.02"
        },{
          name: "Sprintstafett kvinner",
          date: "22.02"
        },{
          name: "Sprintstafett menn",
          date: "22.02"
        },{
          name: "Kombinert lag 100 + 4 x 5 km",
          date: "22.02"
        },{
          name: "Hopp Mix lag HS 100",
          date: "22.02"
        },{
          name: "10 km kvinner friteknikk",
          date: "24.02"
        },{
          name: "15 km menn friteknikk",
          date: "25.02"
        },{
          name: "4 X 5 km stafett kvinner",
          date: "26.02"
        },{
          name: "Kombinert Hopp HS 134 + 10 km Gundersen",
          date: "26.02"
        },{
          name: "Hopp menn HS 134",
          date: "26.02"
        },{
          name: "4 X 10 km stafett menn",
          date: "27.02"
        },{
          name: "30 km kvinner fellesstart klassisk",
          date: "28.02"
        },{
          name: "Kombinert lag sprint HS 134 + 2 x 7,5 km",
          date: "28.02"
        },{
          name: "Hopp Lag menn HS 134",
          date: "28.02"
        },{
          name: "50 km menn fellesstart klassisk",
          date: "28.02"
        }]
      });
    });
  });
}
