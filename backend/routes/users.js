const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// Get user profile
router.get("/:userId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select("-password")
            .populate("followers", "username profilePicture")
            .populate("following", "username profilePicture");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const postCount = await Post.countDocuments({
            user: req.params.userId,
        });
        const followerCount = user.followers.length;
        const followingCount = user.following.length;

        res.json({
            user,
            stats: {
                posts: postCount,
                followers: followerCount,
                following: followingCount,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
    try {
        const { username, bio, profilePicture } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username) user.username = username;
        if (bio) user.bio = bio;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Follow/Unfollow user
router.put("/:userId/follow", auth, async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.userId);
        const currentUser = await User.findById(req.user.userId);

        if (!userToFollow) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userToFollow._id.toString() === req.user.userId) {
            return res.status(400).json({ message: "Cannot follow yourself" });
        }

        const isFollowing = currentUser.following.includes(req.params.userId);
        if (isFollowing) {
            // Unfollow
            currentUser.following = currentUser.following.filter(
                (id) => id.toString() !== req.params.userId
            );
            userToFollow.followers = userToFollow.followers.filter(
                (id) => id.toString() !== req.user.userId
            );
        } else {
            // Follow
            currentUser.following.push(req.params.userId);
            userToFollow.followers.push(req.user.userId);
        }

        await currentUser.save();
        await userToFollow.save();

        res.json({
            following: isFollowing ? false : true,
            followersCount: userToFollow.followers.length,
            followingCount: currentUser.following.length,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get user's feed
router.get("/feed", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const following = user.following;
        following.push(req.user.userId); // Include user's own posts

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "username profilePicture")
            .populate("comments.user", "username profilePicture");

        const total = await Post.countDocuments({ user: { $in: following } });

        res.json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
