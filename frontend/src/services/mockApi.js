// Mock API service for development
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock data
const mockUsers = [
    {
        _id: "1",
        username: "john_doe",
        email: "john@example.com",
        name: "John Doe",
        bio: "Photography enthusiast | Travel lover | Food blogger",
        profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
        followers: ["2", "3"],
        following: ["2"],
        posts: 15,
    },
    {
        _id: "2",
        username: "jane_smith",
        email: "jane@example.com",
        name: "Jane Smith",
        bio: "Digital artist | Nature lover",
        profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
        followers: ["1"],
        following: ["1", "3"],
        posts: 8,
    },
    {
        _id: "3",
        username: "alex_wilson",
        email: "alex@example.com",
        name: "Alex Wilson",
        bio: "Fitness coach | Healthy lifestyle",
        profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
        followers: ["2"],
        following: ["1"],
        posts: 12,
    },
];

const mockPosts = [
    {
        _id: "101",
        user: mockUsers[0],
        image: "https://source.unsplash.com/random/800x800/?nature",
        caption: "Beautiful day in nature! #nature #outdoors",
        likes: ["2", "3"],
        comments: [
            {
                _id: "201",
                user: mockUsers[1],
                text: "Amazing view!",
                createdAt: "2023-06-15T10:30:00Z",
            },
        ],
        createdAt: "2023-06-15T09:00:00Z",
    },
    {
        _id: "102",
        user: mockUsers[1],
        image: "https://source.unsplash.com/random/800x800/?food",
        caption: "Delicious brunch today! #foodie #brunch",
        likes: ["1"],
        comments: [],
        createdAt: "2023-06-14T11:20:00Z",
    },
    {
        _id: "103",
        user: mockUsers[2],
        image: "https://source.unsplash.com/random/800x800/?fitness",
        caption: "Morning workout done! #fitness #health",
        likes: ["1", "2"],
        comments: [
            {
                _id: "202",
                user: mockUsers[0],
                text: "Great job!",
                createdAt: "2023-06-13T08:45:00Z",
            },
        ],
        createdAt: "2023-06-13T07:30:00Z",
    },
    {
        _id: "104",
        user: mockUsers[0],
        image: "https://source.unsplash.com/random/800x800/?travel",
        caption: "Exploring new places! #travel #adventure",
        likes: ["3"],
        comments: [],
        createdAt: "2023-06-12T15:10:00Z",
    },
    {
        _id: "105",
        user: mockUsers[1],
        image: "https://source.unsplash.com/random/800x800/?art",
        caption: "My latest artwork! #art #creative",
        likes: ["1", "3"],
        comments: [
            {
                _id: "203",
                user: mockUsers[2],
                text: "This is incredible!",
                createdAt: "2023-06-11T14:20:00Z",
            },
        ],
        createdAt: "2023-06-11T13:00:00Z",
    },
];

// Helper functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Auth endpoints
export const register = async (userData) => {
    await delay(500); // Simulate network delay

    // Check if email already exists
    const existingUser = mockUsers.find(
        (user) => user.email === userData.email
    );
    if (existingUser) {
        throw new Error("Email already in use");
    }

    // Create new user
    const newUser = {
        _id: `${mockUsers.length + 1}`,
        username: userData.username,
        email: userData.email,
        name: userData.name || userData.username,
        bio: "",
        profilePicture: `https://randomuser.me/api/portraits/${
            Math.random() > 0.5 ? "men" : "women"
        }/${mockUsers.length + 1}.jpg`,
        followers: [],
        following: [],
        posts: 0,
    };

    mockUsers.push(newUser);

    // Generate token
    const token = `mock-token-${newUser._id}`;
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(newUser));

    return { token, user: newUser };
};

export const login = async (userData) => {
    await delay(500); // Simulate network delay

    // Find user by email
    const user = mockUsers.find((user) => user.email === userData.email);
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // In a real app, you would check the password here

    // Generate token
    const token = `mock-token-${user._id}`;
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));

    return { token, user };
};

// User endpoints
export const getUserProfile = async (userId) => {
    await delay(300);

    const user = mockUsers.find((user) => user._id === userId);
    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const updateUserProfile = async (userData) => {
    await delay(300);

    const currentUser = JSON.parse(await AsyncStorage.getItem("user"));
    const userIndex = mockUsers.findIndex(
        (user) => user._id === currentUser._id
    );

    if (userIndex === -1) {
        throw new Error("User not found");
    }

    // Update user data
    const updatedUser = {
        ...mockUsers[userIndex],
        ...userData,
    };

    mockUsers[userIndex] = updatedUser;
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

    return updatedUser;
};

export const followUser = async (userId) => {
    await delay(300);

    const currentUser = JSON.parse(await AsyncStorage.getItem("user"));
    const userToFollow = mockUsers.find((user) => user._id === userId);

    if (!userToFollow) {
        throw new Error("User not found");
    }

    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
        // Unfollow
        currentUser.following = currentUser.following.filter(
            (id) => id !== userId
        );
        userToFollow.followers = userToFollow.followers.filter(
            (id) => id !== currentUser._id
        );
    } else {
        // Follow
        currentUser.following.push(userId);
        userToFollow.followers.push(currentUser._id);
    }

    // Update in mock data
    const currentUserIndex = mockUsers.findIndex(
        (user) => user._id === currentUser._id
    );
    const userToFollowIndex = mockUsers.findIndex(
        (user) => user._id === userId
    );

    mockUsers[currentUserIndex] = currentUser;
    mockUsers[userToFollowIndex] = userToFollow;

    await AsyncStorage.setItem("user", JSON.stringify(currentUser));

    return {
        following: !isFollowing,
        followersCount: userToFollow.followers.length,
    };
};

export const getFeed = async (page = 1, limit = 10) => {
    await delay(500);

    const currentUser = JSON.parse(await AsyncStorage.getItem("user"));

    // In a real app, you would filter posts from followed users
    // For mock, just return all posts
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedPosts = mockPosts.slice(start, end);

    return {
        posts: paginatedPosts,
        currentPage: page,
        totalPages: Math.ceil(mockPosts.length / limit),
    };
};

// Post endpoints
export const createPost = async (postData) => {
    await delay(500);

    const currentUser = JSON.parse(await AsyncStorage.getItem("user"));

    const newPost = {
        _id: `${mockPosts.length + 101}`,
        user: currentUser,
        image: postData.image || "https://source.unsplash.com/random/800x800",
        caption: postData.caption || "",
        likes: [],
        comments: [],
        createdAt: new Date().toISOString(),
    };

    mockPosts.unshift(newPost); // Add to beginning of array

    // Update user post count
    const userIndex = mockUsers.findIndex(
        (user) => user._id === currentUser._id
    );
    mockUsers[userIndex].posts += 1;

    return newPost;
};

export const getAllPosts = async (page = 1, limit = 10) => {
    await delay(300);

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedPosts = mockPosts.slice(start, end);

    return {
        posts: paginatedPosts,
        currentPage: page,
        totalPages: Math.ceil(mockPosts.length / limit),
    };
};

export const getUserPosts = async (userId) => {
    await delay(300);

    const userPosts = mockPosts.filter((post) => post.user._id === userId);

    return userPosts;
};

export const likePost = async (postId) => {
    await delay(200);

    const currentUser = JSON.parse(await AsyncStorage.getItem("user"));
    const postIndex = mockPosts.findIndex((post) => post._id === postId);

    if (postIndex === -1) {
        throw new Error("Post not found");
    }

    const post = mockPosts[postIndex];
    const isLiked = post.likes.includes(currentUser._id);

    if (isLiked) {
        // Unlike
        post.likes = post.likes.filter((id) => id !== currentUser._id);
    } else {
        // Like
        post.likes.push(currentUser._id);
    }

    mockPosts[postIndex] = post;

    return {
        liked: !isLiked,
        likesCount: post.likes.length,
    };
};

export const commentOnPost = async (postId, text) => {
    await delay(300);

    const currentUser = JSON.parse(await AsyncStorage.getItem("user"));
    const postIndex = mockPosts.findIndex((post) => post._id === postId);

    if (postIndex === -1) {
        throw new Error("Post not found");
    }

    const newComment = {
        _id: `${Date.now()}`,
        user: currentUser,
        text,
        createdAt: new Date().toISOString(),
    };

    mockPosts[postIndex].comments.push(newComment);

    return newComment;
};

export const deletePost = async (postId) => {
    await delay(300);

    const currentUser = JSON.parse(await AsyncStorage.getItem("user"));
    const postIndex = mockPosts.findIndex((post) => post._id === postId);

    if (postIndex === -1) {
        throw new Error("Post not found");
    }

    const post = mockPosts[postIndex];

    // Check if current user is the post owner
    if (post.user._id !== currentUser._id) {
        throw new Error("Unauthorized");
    }

    // Remove post
    mockPosts.splice(postIndex, 1);

    // Update user post count
    const userIndex = mockUsers.findIndex(
        (user) => user._id === currentUser._id
    );
    mockUsers[userIndex].posts -= 1;

    return { success: true };
};

export default {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    followUser,
    getFeed,
    createPost,
    getAllPosts,
    getUserPosts,
    likePost,
    commentOnPost,
    deletePost,
};
