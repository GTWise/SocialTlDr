/**
 * This javascript file contains all functions that interact between the controller
 * and the APIs, specifically Twitter and Meaningcloud
 */

async function getTweets(hashtag, callback) {

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "meaningcloud-summarization-v1.p.rapidapi.com",
            "x-rapidapi-key": "76fa6577cemsh472658854668334p1c523ajsn7a67c55ae42a",
            "accept": "application/json"
        }
    }
    
    $.ajax(settings).done(callback);

}

$ curl --request GET 
 --url '' 
 --header 'authorization: OAuth oauth_consumer_key="consumer-key-for-app", 
 oauth_nonce="generated-nonce", oauth_signature="generated-signature", 
 oauth_signature_method="HMAC-SHA1", oauth_timestamp="generated-timestamp", 
 oauth_token="access-token-for-authed-user", oauth_version="1.0"'
$ twurl /1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2

async function getSummary(text, callback) {

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://meaningcloud-summarization-v1.p.rapidapi.com/summarization-1.0?txt=" + text + "&sentences=5",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "meaningcloud-summarization-v1.p.rapidapi.com",
            "x-rapidapi-key": "76fa6577cemsh472658854668334p1c523ajsn7a67c55ae42a",
            "accept": "application/json"
        }
    }
    
    $.ajax(settings).done(callback);

}