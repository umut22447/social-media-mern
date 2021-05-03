const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    username: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    profilePicture: {
        type: Object,
        default: null
    },
    followers: {
        type: Array,
        default: []
    },
    follows: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('User', userSchema);