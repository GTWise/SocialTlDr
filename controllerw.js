//This function will use the Twitter API to retrieve a list of Tweets based on the searchTerm (hashtag)
//In the background, it should also update our private records about search activity
//In the background, it should also update our user records about search activity
//In the background, it should also update our public records about search activity

 function twitterStepOne(searchTerm) {
//    alert("Twitter Step One is Calling with Search Term " + searchTerm);

    return "This is Tweet Data";
}

//This function will use the SMMRY API to generate a condensed paragraph based on the Tweets retrieved by twitterStepOne()

 function twitterStepTwo(tweetData) {
//    alert("Twitter Step Two is Calling with Tweet Data " + tweetData);

    return "This is a Summary";
}

//This function will use jQuery to fill the textbox with the summary generated by twitterStepTwo()

function twitterStepThree(summary) {
//    alert("Twitter Step Three is Calling with Summary " + summary);

    $("#delivery").val(summary);
}

//This function will control generating the Tweet summary by calling twitterStepOne(), Two(), and Three()

function summaryGenerate() {
    let searchTerm = $("#hashtaginputbox").val();
    let firstresult = twitterStepOne(searchTerm);
    let secondresult = twitterStepTwo(firstresult);
    twitterStepThree(secondresult);

}

//This function will bring up a "Log In" Box

function aboutInit () {

    const aboutsiteone = "<p id = 'aboutsiteone'>#TL;DR allows you to keep up-to-date with ongoing global conversations on Twitter, while protecting your time from the endless hours lost through endless scrolling of social media.</p>";
    const aboutsitetwo = "<p id = 'aboutsitetwo'>Our site retrieves a collection of Tweets from Twitter, then runs them through the SMMRY API, producing a quick snapshot of an ongoing conversation or trend.</p>";
    const aboutus = "<p id = 'aboutus'>Team TL;DR is a collaborative team for four UNC students: Ish Ahmed, Gabriel Clark, Casey Stamper, and Grant Wise. This site was developed for UNC's COMP 426 Course, run by Ketan Mayer-Patel.</p>";
    const contactus = "<p id = 'contactus'>For questions, comments, concerns, complaints, and death threats, please send all correspondence to TeamTLDR@gmail.com.</p>";
    const backtosite = "<input id = 'backtosite' type = 'button' value = 'Back to Site' />";

    nevermindConc();

    $("#multipurposebox").css("display", "block");
    $("#multipurposeheader").html("<h3>About #TL;DR and Team TL;DR</h3>");
    $("#multipurposebody").append(aboutsiteone);
    $("#multipurposebody").append(aboutsitetwo);    
    $("#multipurposebody").append(aboutus); 
    $("#multipurposebody").append(contactus); 
    $("#multipurposeinteractive").append(backtosite);

    $("#backtosite").on("click", nevermindConc);

}

//This function will bring up a "Log In" Box

function logInInit () {

    const username = "<p id = 'usernameinput'>Username: <input type = 'text' id = 'username' value = 'username' /></p>";
    const password = "<p id = 'passwordinput'>Password: <input type = 'password id = 'userkey' /></p>";
    const login = "<input type = 'button' id = 'multipurposelogin' value = 'Log In' />";
    const signup = "<input type = 'button' id = 'multipurposesignup' value = 'Sign Up' />";
    const nevermind = "<input type = 'button' id = 'multipurposenevermind' value = 'Nevermind' />";

    nevermindConc();

    $("#multipurposebox").css("display", "block");
    $("#multipurposeheader").html("<h3>Log In or Sign Up</h3>");
    $("#multipurposebody").append(username);
    $("#multipurposebody").append(password);    
    $("#multipurposeinteractive").append(login);
    $("#multipurposeinteractive").append(signup);
    $("#multipurposeinteractive").append(nevermind);

    $("#multipurposelogin").on("click", logInConc);
    $("#multipurposesignup").on("click", signUpConc);
    $("#multipurposenevermind").on("click", nevermindConc);

}

//This function will log in a user via username and password
//In the background, it should also update our private records about user activity
//In the background, it should also update our user records about user's last log in
//In the background, it should also update our public records about how many users are logged in

function logInConc () {

}

//This function will create a new User Record
//In the background, it should also update our private records about user activity
//In the background, it should also update our public records about how many users are registered

function signUpConc () {

}

//This function clears and hides the multipurpose box

function nevermindConc () {

    $("#multipurposebox").css("display: block");
    $("#multipurposeheader").empty();
    $("#multipurposebody").empty(); 
    $("#multipurposeinteractive").empty();

    $("#multipurposebox").css("display", "none");
}

//This function will create a new saved collection record under the User
function saveCollection () {

}

//This function will clear out the delivery box

function clearDelivery () {

    $("#delivery").val('');

}

//Reads the user's collection of saved Summaries and displays an interactive list

function accessCollection () {

}

//This function will add click functionality to all of our buttons and inputs

function addObservers() {
    $("#hashtagbutton").on("click", summaryGenerate);
    $("#clearsummary").on("click", clearDelivery);
    $("#login").on("click", logInInit);
    $("#headertext").on("click", aboutInit);

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