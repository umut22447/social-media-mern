const Post = require('../models/Post');
const { postValidation } = require('../validation');

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

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (err) {
        res.json({ message: err });
    }
}

module.exports.newPost = newPost;
module.exports.getPosts = getPosts;