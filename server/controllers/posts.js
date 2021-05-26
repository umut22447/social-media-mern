const Post = require('../models/Post');
const { postValidation } = require('../validation');

//Add new post
const newPost = async (req, res) => {
    const { userID } = req;
    const { description } = JSON.parse(req.body['form-body']);
    const image = req.file;

    //Post validation
    const postValidationObject = {
        userID: userID,
        image: image,
        description: description
    }
    const { error } = postValidation(postValidationObject);
    if (error) return res.status(400).json({ errorMessage: error.details[0].message });

    //Create new post
    const post = new Post({
        userID: userID,
        image: image,
        description: description
    });

    //Save to database
    try {
        const savedPost = await post.save();
        res.json({ message: "Success" });
    }
    catch (err) {
        res.status(400).json({ errorMessage: err })
    }
}

//Sends all posts
const getPosts = async (req, res) => {
    const postByPage = 5;
    const { page } = req.body;

    try {
        const posts = await Post.find({}, {}, { sort: { creationDate: -1 }, skip: parseInt(page) * postByPage, limit: postByPage });
        res.json(posts);
    }
    catch (err) {
        res.status(400).json({ errorMessage: err });
    }
}

//Get post by id
const getPostByID = async (req, res) => {
    const postID = req.params.postID;

    try {
        const post = await Post.findOne({ _id: postID });
        res.json(post);
    }
    catch (err) {
        res.status(400).json({ errorMessage: err })
    }
}

//Get user posts
const getPostsByUserID = async (req, res) => {
    try {
        const posts = await Post.find({ userID: req.params.userID });
        res.json(posts);
    }
    catch (err) {
        res.status(400).json({ errorMessage: err });
    }
}

//Update like list of post
const updatePostLikeList = async (req, res) => {
    const { userID } = req;
    const { postID } = req.body;
    try {
        const { likedUsers } = await Post.findOne({ _id: postID })
        const isLiked = likedUsers.includes(userID);
        const newList = isLiked ? likedUsers.filter(id => id !== userID) : [...likedUsers, userID];
        const updatedPost = await Post.updateOne({ _id: postID }, { $set: { likedUsers: newList } });
        res.json({ message: "Success" });
    }
    catch (err) {
        res.json({ errorMessage: err });
    }
}

module.exports.newPost = newPost;
module.exports.getPosts = getPosts;
module.exports.getPostsByUserID = getPostsByUserID;
module.exports.updatePostLikeList = updatePostLikeList;
module.exports.getPostByID = getPostByID;