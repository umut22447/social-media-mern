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

    //Check the user exists
    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(400).json({ errorMessage: 'Cannot find user.' });

    //Check the target user exists
    const targetUser = await User.findOne({ _id: targetUserID });
    if (!targetUser) return res.status(400).json({ errorMessage: 'Cannot find user.' });

    try {
        //Check user is in already in follower list. If not then add user to the list.
        const followerList = [...targetUser.followers];
        const newList = followerList.includes(userID) ? followerList.filter(id => id !== userID) : [...followerList, userID];
        await User.updateOne({ _id: targetUserID }, { $set: { followers: newList } });

        //Set the follows list
        const followsList = [...user.follows];
        const newFollowsList = followsList.includes(targetUserID) ? followsList.filter(id => id !== targetUserID) : [...followsList, targetUserID];
        await User.updateOne({ _id: userID }, { $set: { follows: newFollowsList } });
        res.json({ message: 'Success' });
    }
    catch (err) {
        res.status(400).json({ errorMessage: err });
    }
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

const updateUser = async (req, res) => {
    const { userID } = req;
    const { firstName, lastName, username } = req.body;

    //Check the user exists
    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(400).json({ errorMessage: 'Cannot find user' });

    //Check if other users has the updated username
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists && userID != usernameExists._id) return res.status(400).json({ errorMessage: 'Username already exists' });

    try {
        await User.updateOne({ _id: userID }, { $set: req.body });
        res.json({ message: "Success" });
    }
    catch (err) {
        res.status(400).json({ errorMessage: err });
    }
}

module.exports.getUsername = getUsername;
module.exports.followUser = followUser;
module.exports.updateProfilePicture = updateProfilePicture;
module.exports.getUsernameAndPicture = getUsernameAndPicture;
module.exports.getUserProfile = getUserProfile;
module.exports.updateUser = updateUser;