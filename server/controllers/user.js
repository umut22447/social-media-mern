const User = require('../models/User');

const getUsername = async (req, res) => {
    const userID = req.params.userID;

    //Get username
    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(400).json({ errorMessage: 'Cannot found user.' });

    //Destruct
    const { username } = user;

    res.json({ username });
}

const getUsernameAndPicture = async (req, res) => {
    const userID = req.params.userID;

    //Check user and get profile picture and username
    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(400).json({ errorMessage: 'Cannot found user.' });

    //Destruct user
    const { username, profilePicture } = user;

    res.json({ username, userPicture: profilePicture });
}

const getUserProfile = async (req, res) => {
    //Check user and get profile info by username
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).json({ errorMessage: 'Cannot found user.' });

    //Destruct
    const { _id, username, profilePicture, followers, follows, firstName, lastName } = user;

    res.json({ _id, username, userPicture: profilePicture, followers, follows, firstName, lastName });
}

const followUser = async (req, res) => {
    const { userID } = req;
    const { targetUserID } = req.body;
}

const updateProfilePicture = async (req, res) => {
    const { userID } = req;
    const image = req.file;

    //Update Profile Picture
    try {
        await User.updateOne({ _id: userID }, { $set: { profilePicture: image } });
        res.json({ message: "Success" });
    }
    catch (err) {
        res.json({ errorMessage: err });
    }
}

module.exports.getUsername = getUsername;
module.exports.followUser = followUser;
module.exports.updateProfilePicture = updateProfilePicture;
module.exports.getUsernameAndPicture = getUsernameAndPicture;
module.exports.getUserProfile = getUserProfile;