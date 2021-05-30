const localforage = require('localforage');
const AUTH_API_URL = "https://umern-api.herokuapp.com/api/auth";
const USER_API_URL = "https://umern-api.herokuapp.com/api/user";

//---------------Fetch server events---------------
module.exports.loginWithEmailAndPassword = async (email, password) => {
    return await fetch(AUTH_API_URL + '/login', {
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
    return await fetch(AUTH_API_URL + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, username, email, password })
    }).then(res => res.json()).catch(err => err);
}

module.exports.getUserDetails = async (token) => {
    return await fetch(AUTH_API_URL + '/get-user-details', {
        method: 'GET',
        headers: {
            'auth-token': token
        }
    }).then(res => res.json()).catch(err => err);
}

module.exports.getUsernameByID = async (userID) => {
    return await fetch(USER_API_URL + '/get-username/' + userID).then(res => res.json()).catch(err => err);
}

module.exports.getUsernameAndPictureByID = async (userID) => {
    return await fetch(USER_API_URL + '/get-username-picture/' + userID).then(res => res.json()).catch(err => err);
}

module.exports.getUserProfile = async (username) => {
    return await fetch(USER_API_URL + '/get-user-profile/' + username).then(res => res.json()).catch(err => err);
}

module.exports.followUser = async (token, targetUserID) => {
    return await fetch(USER_API_URL + '/follow', {
        method: 'POST',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ targetUserID })
    }).then(res => res.json()).catch(err => err);
}

module.exports.updateProfilePicture = async (token, image) => {
    var formData = new FormData();
    formData.append('image', image[0]);
    return await fetch(USER_API_URL + '/update-profile-picture', {
        method: 'POST',
        headers: {
            'auth-token': token
        },
        body: formData
    }).then(res => res.json()).catch(err => err);
}

module.exports.updateUser = async (token, updatedData) => {
    return await fetch(USER_API_URL + '/update', {
        method: 'POST',
        headers: {
            'auth-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    }).then(res => res.json()).catch(err => err);
}


//---------------Fetch local events-----------------
module.exports.getSavedUser = async () => {
    return {
        token: await localforage.getItem('token')
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