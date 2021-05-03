const User = require('../models/User');

const getUsername = async (req, res) => {
    const userID = req.params.userID;

    //Get username
    const { username } = await User.findOne({ _id: userID });
    if (!username) return res.status(400).json({ errorMessage: 'Cannot found user.' });

    res.json({ username });
}

const followUser = async (req, res) => {
    const { userID } = req;
    const { targetUserID } = req.body;
}

module.exports.getUsername = getUsername;
module.exports.followUser = followUser;