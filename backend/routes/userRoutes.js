const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    followUser
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Protected routes (Auth routes are now handled by auth.js)
router.get('/profile', protect, getUserProfile);
router.post('/follow/:id', protect, followUser);

module.exports = router;