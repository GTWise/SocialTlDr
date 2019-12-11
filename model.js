/**
 * This javascript file contains all functions that interact between the database
 * and the HTML view index.html. These functions will all be called by controller.js
 * and will interact with index.html only through controller.js.
 */


// Firebase CRUD tests
var database = firebase.database();

// NOTE: path must always be passed as a string

// To read
async function readData(path) {
    var result;
    await database.ref(path).once('value').then(function (snapshot) {
        result = snapshot.val();
    });
    return result;
}

// To write
function writeData(path, value) {
    database.ref(path).set(value);
}

// To delete
function deleteData(path) {
    database.ref(path).remove()
}

// To update
function updateData(path, value) {
    var updates = {};
    updates[path] = value;
    database.ref().update(updates)
}

async function readUserData(username, callback) {
    await database.ref('user/' + username).on('value', callback);
}

async function modelLogIn(user, password) {
    var result = {
        username: undefined,
        summarycount: undefined,
        valid: false,
        wrongpassword: false
    };

    await database.ref('user/' + user).once('value').then(function (snapshot) {
        let userpass = snapshot.val().password;

        if (userpass != password) {
            result.wrongpassword = true;
        }

        else if (userpass == password) {
            result.valid = true;
            result.summarycount = snapshot.val().summarycount;
            result.username = user;
        }
    }).catch(function () {
        alert('This account does not exist. You must sign up before you can log in.')
    });
    return result;
}
