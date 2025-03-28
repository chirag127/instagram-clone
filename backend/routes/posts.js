const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Create a post
router.post("/", auth, async (req, res) => {
    try {
        const { image, caption, location, tags } = req.body;
        const post = new Post({
            user: req.user.userId,
            image,
            caption,
            location,
            tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        });

        await post.save();
        await post.populate("user", "username profilePicture");
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get all posts (with pagination)
router.get("/", auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "username profilePicture")
            .populate("comments.user", "username profilePicture");

        const total = await Post.countDocuments();

        res.json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get user's posts
router.get("/user/:userId", auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId })
            .sort({ createdAt: -1 })
            .populate("user", "username profilePicture")
            .populate("comments.user", "username profilePicture");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Like/Unlike a post
router.put("/:postId/like", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const likeIndex = post.likes.indexOf(req.user.userId);
        if (likeIndex === -1) {
            post.likes.push(req.user.userId);
        } else {
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Add comment to a post
router.post("/:postId/comments", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments.push({
            user: req.user.userId,
            text: req.body.text,
        });

        await post.save();
        await post.populate("comments.user", "username profilePicture");
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Delete a post
router.delete("/:postId", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.remove();
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
