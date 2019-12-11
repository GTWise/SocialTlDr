/**
 * This javascript file contains all functions that interact between the database
 * and the HTML view index.html. These functions will all be called by controller.js
 * and will interact with index.html only through controller.js.
 */


// Firebase tests
var database = firebase.database();


async function readUserData(username, callback) {

    await database.ref('user/' + username).on('value', callback);

}

function printUserData(snapshot) {
    let password = snapshot.val().password;
    let summarycount = snapshot.val().summarycount;

    console.log(password);
    console.log(summarycount);
}

async function tester(user) {
    let result = await modelLogIn(user, "nonsense");

    console.log(result);
}

async function modelLogIn(user, password) {
    var result = {
        username: undefined,
        summarycount: undefined,
        valid: false
    };
    
    await database.ref('user/' + user).once('value').then(function(snapshot) {
        let userpass = snapshot.val().password;
        
        console.log(userpass);
        console.log(password);

        if (userpass == password) {
            result.valid = true;
            result.summarycount = snapshot.val().summarycount;
            result.username = user;
        }
    });
    return result;

}
