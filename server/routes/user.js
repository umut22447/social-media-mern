const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const { getUsername, followUser, getUsernameAndPicture, updateProfilePicture, getUserProfile } = require('../controllers/user');

router.get('/get-username/:userID', getUsername);
router.get('/get-username-picture/:userID', getUsernameAndPicture);
router.get('/get-user-profile/:username', getUserProfile);
router.post('/follow', verifyToken, followUser);
router.post('/update-profile-picture', upload.single('image'), verifyToken, updateProfilePicture);

module.exports = router;