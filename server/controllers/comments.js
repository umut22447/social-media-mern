const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { commentValidation } = require('../validation');

//New comment
const addNewComment = async (req, res) => {
    const { userID } = req;
    const { postID, commentText } = req.body;

    const commentValidationObject = {
        postID,
        userID,
        commentText
    }

    //Check the required fields are not empty
    const { error } = commentValidation(commentValidationObject);
    if (error) return res.status(400).json({ errorMessage: error.details[0].message });

    //Check if the post exists
    const post = await Post.findOne({ _id: postID });
    if (!post) return res.status(404).json({ errorMessage: 'Cannot find post' });

    //Create new comment
    const newComment = new Comment({
        postID,
        userID,
        commentText
    })

    //Save to the database
    try {
        await newComment.save();
        res.json({ message: 'Success' });
    }
    catch (err) {
        res.status(400).json({ errorMessage: err });
    }
}

const getComments = async (req, res) => {
    const postID = req.params.postID;

    //Find comments by post id
    const comments = await Comment.find({ postID: postID });

    res.json(comments);
}

module.exports.addNewComment = addNewComment;
module.exports.getComments = getComments;