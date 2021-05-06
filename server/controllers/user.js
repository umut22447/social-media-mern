const User = require('../models/User');

const getUsername = async (req, res) => {
    const userID = req.params.userID;

    //Get username
    const { username } = await User.findOne({ _id: userID });
    if (!username) return res.status(400).json({ errorMessage: 'Cannot found user.' });

    res.json({ username });
}

const getUsernameAndPicture = async (req, res) => {
    const userID = req.params.userID;

    //Check user and get profile picture and username
    const { username, profilePicture } = await User.findOne({ _id: userID });
    if (!username) return res.status(400).json({ errorMessage: 'Cannot found user.' });

    res.json({ username, userPicture: profilePicture });
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