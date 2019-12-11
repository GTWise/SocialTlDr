// app.js
var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);
var tweetal;

const fs = require('fs');

// Set up your search parameters
function searchTweets(search){
  let totalTweets = '';
  var params = {
      q: search,
      count: 100,
      result_type: 'recent',
      lang: 'en',
      result_type:'mixed'
    }

  T.get('search/tweets', params, function(err, data, response) {
    if(!err){
        for(let i=0; i<data.statuses.length; i++){
            totalTweets = totalTweets.concat('. ', data.statuses[i].text)
          }
          tweetal = totalTweets
          fs.writeFile('./SocialTlDr/tweets.txt', totalTweets, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
        
            // success case, the file was saved
            console.log('Tweets saved!');
        });
          return totalTweets;    
    } else {
      console.log(err);
    }
  });
}

searchTweets('taco bell');
