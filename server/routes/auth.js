const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const { register, login, getUserDetails } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/get-user-details', verifyToken, getUserDetails)

module.exports = router;