const localforage = require('localforage');

//---------------Fetch server events---------------
module.exports.loginWithEmailAndPassword = async (email, password) => {
    return await fetch('http://localhost:9000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => res.json()).catch(err => err);
}

module.exports.registerWithEmailAndPassword = async (firstName, lastName, username, email, password) => {
    return await fetch('http://localhost:9000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, username, email, password })
    }).then(res => res.json()).catch(err => err);
}

module.exports.getUsernameByID = async (userID) => {
    return await fetch('http://localhost:9000/api/user/get-username/' + userID).then(res => res.json()).catch(err => err);
}


//---------------Fetch local events-----------------
module.exports.getSavedUser = async () => {
    return {
        token: await localforage.getItem('token'),
        user: await localforage.getItem('user')
    }
}

module.exports.saveUser = async (token, user) => {
    await localforage.setItem('token', token);
    await localforage.setItem('user', user);
}

module.exports.removeSavedUser = async () => {
    await localforage.setItem('token', null);
    await localforage.setItem('user', null);
}