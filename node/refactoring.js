const fetch = require('node-fetch');
const fs = require('fs');

/*
* find users by name on external server
*/
async function findUsers(term) {
    var data;
    var result = [];

    switch (term)
    {
        case null:
        case undefined:
            throw 'invalid input term';
        case '':
            throw new Error('empty string');
        default:
            // query users from remote server
            const query = "SELECT * FROM Users where name = " + term;
            const response = await fetch('http://myserver.com/users?query=' + query);
            data = await response.json();

    }

    // filter only active users
    data.forEach(user => {
        if (user.isActive) {
            result.push(user)
        }
    });

    fs.appendFile('./logs/responses.log', JSON.stringify(data));

    return result;
}

module.exports = findUsers
