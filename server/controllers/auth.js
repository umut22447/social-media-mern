const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

const register = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    //User validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).json({ errorMessage: error.details[0].message });

    //Check user exists
    const emailExists = await User.findOne({ email: email });
    const usernameExists = await User.findOne({ username: username });
    if (emailExists) return res.status(400).json({ errorMessage: 'Email already exists.' });
    if (usernameExists) return res.status(400).json({ errorMessage: 'Username already exists.' });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const user = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hashedPassword
    })

    //Save user to the database
    try {
        const savedUser = await user.save();
        res.send({ message: "Successfully registered." });
    }
    catch (err) {
        res.status(400).send({ errorMessage: err });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    //User validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({ errorMessage: error.details[0].message });

    //Find user
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ errorMessage: 'Email or Password is wrong.' });

    //Password validation
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ errorMessage: 'Email or Password is wrong.' });

    //Generate a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth_token', token).json({ token: token, user: user });
}

const getUserDetails = async (req, res) => {
    const { userID } = req;

    //Find user
    const user = await User.findOne({ _id: userID });
    if (!user) return res.status(400).json({ errorMessage: 'Cannot find user.' });

    res.json(user);
}

module.exports.register = register;
module.exports.login = login;
module.exports.getUserDetails = getUserDetails;