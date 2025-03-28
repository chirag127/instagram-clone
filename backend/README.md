# Instagram Clone Backend

This is the backend for the Instagram clone application built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

3. Start the server:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login user

### Users

-   `GET /api/users/:userId` - Get user profile
-   `PUT /api/users/profile` - Update user profile
-   `PUT /api/users/:userId/follow` - Follow/Unfollow user
-   `GET /api/users/feed` - Get user's feed

### Posts

-   `POST /api/posts` - Create a new post
-   `GET /api/posts` - Get all posts (with pagination)
-   `GET /api/posts/user/:userId` - Get user's posts
-   `PUT /api/posts/:postId/like` - Like/Unlike a post
-   `POST /api/posts/:postId/comments` - Add comment to a post
-   `DELETE /api/posts/:postId` - Delete a post

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

## Features

-   User authentication with JWT
-   Post creation and management
-   Like and comment functionality
-   Follow/Unfollow users
-   User feed
-   Profile management
-   Image upload support
-   Pagination for posts and feeds

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB with Mongoose
-   JWT for authentication
-   Multer for file uploads
-   CORS for cross-origin requests
