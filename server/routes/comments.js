const router = require('express').Router();
const { addNewComment, getComments } = require('../controllers/comments');
const verifyToken = require('../verifyToken');

router.get('/get-comments/:postID', getComments);
router.post('/new-comment', verifyToken, addNewComment);

module.exports = router;