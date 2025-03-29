const express = require('express');
const router = express.Router();
const {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    addComment
} = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middleware/upload'); // Import upload middleware

// All routes are protected
router.post('/', protect, upload, createPost); // Add upload middleware
router.get('/feed', protect, getFeedPosts);
router.get('/user/:userId', protect, getUserPosts);
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, addComment);

module.exports = router;