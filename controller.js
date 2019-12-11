//This function will use the Twitter API to retrieve a list of Tweets based on the searchTerm (hashtag)
//In the background, it should also update our private records about search activity
//In the background, it should also update our user records about search activity
//In the background, it should also update our public records about search activity

function twitterStepOne(searchTerm) {
    alert("Twitter Step One is Calling with Search Term " + searchTerm);

    return "This is Tweet Data";
}

//This function will use the SMMRY API to generate a condensed paragraph based on the Tweets retrieved by twitterStepOne()

function twitterStepTwo(tweetData) {
    alert("Twitter Step Two is Calling with Tweet Data " + tweetData);

    return "This is a Summary";
}

//This function will use jQuery to fill the textbox with the summary generated by twitterStepTwo()

function twitterStepThree(summary) {
    alert("Twitter Step Three is Calling with Summary " + summary);

    $("#delivery").val(summary);
}

//This function will control generating the Tweet summary by calling twitterStepOne(), Two(), and Three()

function summaryGenerate() {
    let searchTerm = $("#hashtaginput").val();
    console.log(searchTerm);
    let firstresult = twitterStepOne(searchTerm);
    let secondresult = twitterStepTwo(firstresult);
    let thirdresult = twitterStepThree(secondresult);

}

//This function will bring up a "Log In" Box

function logInInit() {

}

//This function will log in a user via username and password
//In the background, it should also update our private records about user activity
//In the background, it should also update our user records about user's last log in
//In the background, it should also update our public records about how many users are logged in

function logInConc() {

}

//This function will bring up a "Sign Up" Box

function signUpInit() {

}

//This function will create a new User Record
//In the background, it should also update our private records about user activity
//In the background, it should also update our public records about how many users are registered

function signUpConc() {

}

//This function will add click functionality to all of our buttons and inputs

function addObservers() {
    $("#hashtagbutton").on("click", summaryGenerate);
}

addObservers();



// Firebase tests
var database = firebase.database();

// To read
// database.ref('directory here')
// ex

function readData() {
    database.ref('private/hashtags/count').on('value', function (snapshot) {
        console.log(snapshot.val());
    })
}
readData();

// To write
// database.ref('directory here').set({object})
// ex

function writeData() {
    database.ref('public/').set({
        username: 'cstamper',
        food: 'sushi'
    })
}
writeData();

// To delete
// database.ref('directory here').remove()
// ex

function deleteData(username, cat) {
    database.ref('user/' + username + '/' + cat).remove()
}
deleteData('cstamper', 'favorites');

// To update
// database.ref('directory here').update()
// ex

function updateData() {
    var updates = {};
    updates['/count'] = 5000;
    database.ref('private/hashtags/').update(updates)
}
updateData();

// smmry api tests

async function smmry(size) {
    text = "Aesop's Fables, or the Aesopica, is a collection of fables credited to Aesop, a slave and storyteller believed to have lived in ancient Greece between 620 and 564 BCE. Of diverse origins, the stories associated with his name have descended to modern times through a number of sources and continue to be reinterpreted in different verbal registers and in popular as well as artistic media. The fables originally belonged to the oral tradition and were not collected for some three centuries after Aesop's death. By that time a variety of other stories, jokes and proverbs were being ascribed to him, although some of that material was from sources earlier than him or came from beyond the Greek cultural sphere. The process of inclusion has continued until the present, with some of the fables unrecorded before the Late Middle Ages and others arriving from outside Europe. The process is continuous and new stories are still being added to the Aesop corpus, even when they are demonstrably more recent work and sometimes from known authors.";

    //  const axios = require("axios");

    const result = await axios({
        "method": "GET",
        "url": "https://community-smmry.p.rapidapi.com/",
        "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "community-smmry.p.rapidapi.com",
            "x-rapidapi-key": "f5bbd8e9ecmsh5c302ab51a27961p1f4feejsn210eeae5a797"
        }, "params": {
            "SM_URL": "https://gtwise.github.io/SocialTlDr/text",
            //"sm_api_input": text,
            "SM_LENGTH": size,
            "SM_API_KEY": "EC60AE22DA"
        }
    })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    console.log(result);
}

smmry(1);
