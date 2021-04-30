const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    likedUsers: {
        type: Array,
        default: []
    },
    status: {
        type: Number,
        default: 1
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);