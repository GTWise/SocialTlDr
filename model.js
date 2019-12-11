/**
 * This javascript file contains all functions that interact between the database
 * and the HTML view index.html. These functions will all be called by controller.js
 * and will interact with index.html only through controller.js.
 */


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