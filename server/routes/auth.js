const express = require('express');
const router = express.Router();
const { register, login, getUsername } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/get-username/:userID', getUsername);

module.exports = router;