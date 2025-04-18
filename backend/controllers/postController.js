const Post = require("../models/Post");

// Create a post
const createPost = async (req, res, next) => {
    // Add next for error handling
    try {
        const { caption } = req.body;
        if (!req.file) {
            res.status(400);
            return next(new Error("Please upload an image"));
        }

        // Construct the image path relative to the server root or a base URL
        // For now, storing the path relative to the backend/uploads directory
        const imagePath = `/uploads/${req.file.filename}`;

        const post = await Post.create({
            user: req.user._id,
            image: imagePath, // Save the path to the image
            caption,
        });

        res.status(201).json(post);
    } catch (error) {
        console.error("Create Post Error:", error); // Log error
        next(error); // Pass error to central handler
    }
};

// Get feed posts
const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "username profilePicture")
            .populate("comments.user", "username profilePicture")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user posts
const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId })
            .populate("user", "username profilePicture")
            .populate("comments.user", "username profilePicture")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like/Unlike post
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const isLiked = post.likes.includes(req.user._id);
        if (isLiked) {
            await Post.findByIdAndUpdate(req.params.id, {
                $pull: { likes: req.user._id },
            });
        } else {
            await Post.findByIdAndUpdate(req.params.id, {
                $push: { likes: req.user._id },
            });
        }

        res.json({ message: isLiked ? "Post unliked" : "Post liked" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add comment
const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = {
            user: req.user._id,
            text,
        };

        post.comments.push(comment);
        await post.save();

        const populatedPost = await Post.findById(post._id).populate(
            "comments.user",
            "username profilePicture"
        );

        res.json(populatedPost.comments[populatedPost.comments.length - 1]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    addComment,
};
