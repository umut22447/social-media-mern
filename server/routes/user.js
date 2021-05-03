const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const { getUsername } = require('../controllers/user');

router.get('/get-username/:userID', getUsername);
router.post('/')

module.exports = router;