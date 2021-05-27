const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema);