const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');
const { newPost, getPosts } = require('../controllers/posts');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.get('/', verifyToken, getPosts);
router.post('/new-post', upload.single('image'), verifyToken, newPost);

module.exports = router;