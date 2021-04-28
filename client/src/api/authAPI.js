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