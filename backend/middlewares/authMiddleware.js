const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Use userId consistent with token generation in userController
            req.user = await User.findById(decoded.id).select("-password"); // Keep decoded.id as controller uses { id }
            if (!req.user) {
                // Handle case where user ID in token doesn't exist anymore
                res.status(401);
                return next(new Error("Not authorized, user not found"));
            }
            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error); // Log the specific error
            res.status(401);
            // Pass error to central handler
            return next(new Error("Not authorized, token failed"));
        }
    }

    if (!token) {
        res.status(401);
        // Pass error to central handler
        return next(new Error("Not authorized, no token"));
    }
};

module.exports = { protect };
