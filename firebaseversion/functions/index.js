const functions = require('firebase-functions');

var Twitter = require('twitter-node-client').Twitter;

	//Callback functions
	var error = function (err, response, body) {
    	console.log('ERROR [%s]', err);
	};
	var success = function (data) {
    	console.log('Data [%s]', data);
	};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.getSummary = functions.https.onRequest(async (req, res) => {
    
    let result;

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://meaningcloud-summarization-v1.p.rapidapi.com/summarization-1.0?txt=" + req.text + "&sentences=5",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "meaningcloud-summarization-v1.p.rapidapi.com",
            "x-rapidapi-key": "76fa6577cemsh472658854668334p1c523ajsn7a67c55ae42a",
            "accept": "application/json"
        }
    }
    $.ajax(settings).done(function(product) {
        result = product.val().summary;
    });
    return result;
});

exports.getTweets = functions.https.onRequest(async (req, res) => {
    
    var twitter = new Twitter();

    let result = twitter.getSearch({'q':req.text,'count': 50}, error, success);

    return result;
});