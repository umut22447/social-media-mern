const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const { register, login } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);

module.exports = router;