const fs = require('fs');

function getTweets(){
    fs.readFile('./SocialTlDr/tweets.txt',"utf8", (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(data);
      return data;
    })
  }

console.log(getTweets());