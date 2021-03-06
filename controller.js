var loggedinuser;

// This function will use the Twitter API to retrieve a list of Tweets based on the searchTerm (hashtag)
// In the background, it should also update our private records about search activity
// In the background, it should also update our user records about search activity
// In the background, it should also update our public records about search activity
function summaryStepZero() {
    let searchTerm = $("#urlinputbox").val();
    summaryStepTwo(searchTerm, "url");
}

function summaryStepOne() {
    let searchTerm = $("#hashtaginputbox").val();
    summaryStepTwo(searchTerm, "text");
}

function wikiStepZero() {
    let searchTerm = $("#urlinputbox").val();
    wikiStepTwo(searchTerm, "url");
}

function wikiStepOne() {
    let searchTerm = $("#hashtaginputbox").val();
    wikiStepTwo(searchTerm, "text");
}

// This function will use the MeaningCloud API to generate a condensed paragraph based on the text retrieved by wikiStepOne()
function summaryStepTwo(tweetData, param) {
    getSummary(tweetData, param, summaryStepThree);
}

// This function will use the MeaningCloud API to generate a condensed paragraph based on the text retrieved by wikiStepOne()
function wikiStepTwo(tweetData, param) {
    getWiki(tweetData, param, wikiStepThree);
}

// This function will use jQuery to fill the textbox with the summary generated by wikiStepTwo()
async function summaryStepThree(summaryresult) {
    $("#delivery").val(summaryresult.summary);
}

function wikiStepThree(wikiresult) {

    let cresult = "";

    if (wikiresult.result == null) {
        cresult = "No Current Wikipedia Suggestions";
    }

    for (let i = 0; i < wikiresult.result.length; i++) {
        j = i.toString();
        cresult = cresult + "\n" + wikiresult.result[i].title + ": " + wikiresult.result[i].url + "\n"
    }

    $("#delivery").val(cresult);
}

// This function will bring up a "Log In" Box
function aboutInit() {

    const aboutsiteone = "<p id = 'aboutsiteone'>#TL;DR allows you to keep up-to-date with ongoing global conversations on Twitter, while protecting your time from the endless hours lost through endless scrolling of social media.</p>";
    const aboutsitetwo = "<p id = 'aboutsitetwo'>Our site retrieves a collection of Tweets from Twitter, then runs them through the MeaningCloud API, producing a quick snapshot of an ongoing conversation or trend.</p>";
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

// This function will bring up a "Log In" Box
function logInInit() {

    const username = "<p id = 'usernameinput'>Username: <input type = 'text' id = 'username' placeholder = 'username' /></p>";
    const password = "<p id = 'passwordinput'>Password: <input type = 'password' id = 'userkey' placeholder = 'password' /></p>";
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

// This function will log in a user via username and password
// In the background, it should also update our private records about user activity
// In the background, it should also update our user records about user's last log in
// In the background, it should also update our public records about how many users are logged in
async function logInConc() {
    // Firebase impl
    var count = await readData('public/logins/');
    count++;
    // write/update to database
    writeData('public/logins/', count);

    user = $("#username").val();
    password = $("#userkey").val();

    let call = await modelLogIn(user, password);

    if (call.wrongpassword == true) {
        alert("Password incorrect.");
        return false;
    }

    if (call.username != undefined) {
        $("#login").html(call.username);
        $("#login").off("click", logInInit);
        $("#login").on("click", accountInit);
        loggedinuser = call.username;
        accountInit();
    }
}

// This function will create a new User Record
// In the background, it should also update our private records about user activity
// In the background, it should also update our public records about how many users are registered
async function signUpConc() {

    let newuser = $("#username").val();
    let newpassword = $("#userkey").val();

    // create user object
    var user = {
        password: newpassword,
        summaryCount: 0
    }

    // increase accounts by 1
    var count = await readData('public/accounts/');
    count++;
    updateData('public/accounts', count);
    // write new user to database
    writeData('user/' + newuser, user);

    loggedinuser = newuser;
    $("#login").html(newuser);
    $("#login").off("click", logInInit);
    $("#login").on("click", accountInit);
    accountInit();
}

// This function will bring up the delete user account box
async function deleteInit() {

    let usernameinfo = loggedinuser; // Retrieves username from variable
    let savedcollectioncount = await readData('user/' + loggedinuser + '/summaryCount/'); // Retrieves number of saved summaries and collections

    const deleteinquiry = "<p>Your account, " + usernameinfo + " has " + savedcollectioncount + " saved summaries. If you would like to delete this account, click the button below. Understand that this action is not reversible.</p>";
    const backtosite = "<input id = 'backtosite' type = 'button' value = 'No, Go Back to Site' />";
    const deleteaccount = "<input id = 'deleteaccount' type = 'button' value = 'Yes, Delete Account' />";

    nevermindConc();

    $("#multipurposebox").css("display", "block");
    $("#multipurposeheader").html("<h3>" + usernameinfo + " Account Deletion</h3>");
    $("#multipurposebody").html(deleteinquiry);
    $("#multipurposeinteractive").append(backtosite);
    $("#multipurposeinteractive").append(deleteaccount);

    $("#backtosite").on("click", nevermindConc);
    $("#deleteaccount").on("click", deleteConc);
}

// This function will delete the user's account from the database
async function deleteConc() {
    // Firebase impl
    deleteData('user/' + loggedinuser);
    // decrease accounts by 1
    var count = await readData('public/accounts/');
    count--;
    updateData('public/accounts', count);
    // NOTE: will decrease public/accounts/ by 1 even if user does not exist

    loggedinuser = undefined;
    $("#login").html("Log In");
    $("#login").off("click", accountInit);
    $("#login").on("click", logInInit);
    nevermindConc();
}

async function getAccountInfo() {
    let userinfo = await readData('user/' + loggedinuser);
    return userinfo;
}

// This function will bring up a "Log In" Box
async function accountInit() {

    let usernameinfo = loggedinuser; // Retrieves username from variable

    let userinfo = await getAccountInfo();

    let savedcollectioncount = userinfo.summaryCount; // Retrieves number of saved summaries and collections

    const accounttable = "<table id = 'accounttable'><tr><td><b>Username:</b></td><td id = 'tableusername'></td></tr><tr><td><b>Member Since:</b></td><td id = 'tablememberdate'></td></tr><tr><td><b>Saved Collections</b></td><td id = 'collectioncount'></td></tr></table>";
    const savedcollectionbutton = "<input type = 'button' id = 'savedcollectiondisplay' value = 'Show Saved Summaries' />";
    const backtosite = "<input id = 'backtosite' type = 'button' value = 'Back to Site' />";
    const deleteaccount = "<input id = 'deleteaccount' type = 'button' value = 'Delete Account' />";

    nevermindConc();

    $("#multipurposebox").css("display", "block");
    $("#multipurposeheader").html("<h3>" + usernameinfo + "</h3>");
    $("#multipurposebody").html(accounttable);
    $("#tableusername").append(usernameinfo);
    $("#collectioncount").append(savedcollectioncount);
    $("#multipurposeinteractive").append(savedcollectionbutton);
    $("#multipurposeinteractive").append(backtosite);
    $("#multipurposeinteractive").append(deleteaccount);

    $("#savedcollectiondisplay").on("click", accessCollection);
    $("#backtosite").on("click", nevermindConc);
    $("#deleteaccount").on("click", deleteInit);
}

// This function clears and hides the multipurpose box
function nevermindConc() {

    $("#multipurposebox").css("display: block");
    $("#multipurposeheader").empty();
    $("#multipurposebody").empty();
    $("#multipurposeinteractive").empty();
    $("#multipurposebox").css("display", "none");
}

// This function will create a new saved collection record under the User
async function saveCollection() {
    // grab summarized text
    var text = $("#delivery").val();
    // write text variable to database
    if (loggedinuser == undefined) {
        alert('You must be logged in to save a summary.');
    } else {
        var index = await readData('user/' + loggedinuser + '/summaryCount/');
        index++;
        writeData('user/' + loggedinuser + '/savedSummaries/' + index, text);
        updateData('user/' + loggedinuser + '/summaryCount/', index);
    }
}

// This function will clear out the delivery box
function clearDelivery() {
    $("#delivery").val('');
}

// Reads the user's collection of saved Summaries and displays an interactive list
async function accessCollection() {
    let result = await readData('user/' + loggedinuser + '/savedSummaries/');

    $("#multipurposesummarybox").css("display", "block");

    for (i = 1; i < result.length; i++) {
        let entry = "<p class = 'summaryentry'>" + result[i] + "</p>";
        let head = "<h5 class = 'summaryhead'>" + (i).toString() + "</h5>"
        $("#multipurposesummarybox").append(head);
        $("#multipurposesummarybox").append(entry);
    }

}

// This function will add click functionality to all of our buttons and inputs
function addObservers() {
    $("#hashtagbutton").on("click", summaryStepOne);
    $("#urlbutton").on("click", summaryStepZero);
    $("#clearsummary").on("click", clearDelivery);
    $("#savesummary").on("click", saveCollection);
    $("#login").on("click", logInInit);
    $("#headertext").on("click", aboutInit);
    $("#wikitextbutton").on("click", wikiStepOne);
    $("#wikiurlbutton").on("click", wikiStepZero);
}

addObservers();
