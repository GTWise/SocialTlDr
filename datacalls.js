/**
 * This javascript file contains all functions that interact between the controller
 * and the APIs, specifically Twitter and Meaningcloud
 */




async function getSummary(text, param, callback) {

    if (param == "url") {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://meaningcloud-summarization-v1.p.rapidapi.com/summarization-1.0?url=" + text + "&sentences=5",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "meaningcloud-summarization-v1.p.rapidapi.com",
                "x-rapidapi-key": "76fa6577cemsh472658854668334p1c523ajsn7a67c55ae42a",
                "accept": "application/json"
            }
        }
            
        $.ajax(settings).done(callback);
        
    }

    else if (param == "text") {

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
}


async function getWiki(text, param, callback) {

    if (param == "url") {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://unfound-wikitopics-v1.p.rapidapi.com/suggestion/wikitopics",
            "method": "POST",
            "headers": {
                "x-rapidapi-host": "unfound-wikitopics-v1.p.rapidapi.com",
                "x-rapidapi-key": "76fa6577cemsh472658854668334p1c523ajsn7a67c55ae42a",
                "content-type": "application/json",
                "accept": "application/json"
            },
            "processData": false,
            "data": "{\"input_type\": \"url\",\"input_data\": \"" + text + "\"}"
        }
        
        $.ajax(settings).done(callback);
    }

    else if (param == "text") {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://unfound-wikitopics-v1.p.rapidapi.com/suggestion/wikitopics",
            "method": "POST",
            "headers": {
                "x-rapidapi-host": "unfound-wikitopics-v1.p.rapidapi.com",
                "x-rapidapi-key": "76fa6577cemsh472658854668334p1c523ajsn7a67c55ae42a",
                "content-type": "application/json",
                "accept": "application/json"
            },
            "processData": false,
            "data": "{\"input_type\": \"text\",\"input_data\": \""+ text + "\"}"
        }
        
        $.ajax(settings).done(callback);
    }

}
