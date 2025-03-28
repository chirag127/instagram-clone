# Instagram Clone Frontend

This is the frontend for the Instagram clone application built with React Native and Expo.

## Features

-   User authentication (login, register)
-   Home feed with posts from followed users
-   Post creation with image upload
-   Like and comment on posts
-   User profiles with follower/following system
-   Search functionality for users
-   Responsive design similar to Instagram

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
# or
expo start
```

This will open the Expo developer tools in your browser. You can run the app on:

-   An Android or iOS simulator
-   Your physical device using the Expo Go app (scan the QR code)
-   Web browser (by clicking "Run in web browser")

## Project Structure

```
frontend/
├── assets/           # Images, fonts, and other static assets
├── node_modules/     # Dependencies
├── src/
│   ├── components/   # Reusable UI components
│   ├── context/      # React Context for state management
│   ├── navigation/   # Navigation configuration
│   ├── screens/      # App screens
│   │   └── auth/     # Authentication screens
│   └── services/     # API services for backend communication
├── App.js            # Main app entry point
├── app.json          # Expo configuration
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

## Key Components

-   **Post** - Displays a post with image, caption, likes, and comments
-   **FormInput** - Reusable form input component with validation support
-   **Button** - Custom button component with different styles

## Screens

-   **LoginScreen** - User login
-   **RegisterScreen** - New user registration
-   **HomeScreen** - Displays the feed of posts
-   **ProfileScreen** - User profile with posts and stats
-   **SearchScreen** - Search for users
-   **CreatePostScreen** - Create and upload new posts
-   **EditProfileScreen** - Edit user profile information
-   **PostDetailScreen** - Detailed view of a post with comments
-   **CommentsScreen** - View and add comments on a post

## Backend Connection

The app connects to the backend API using Axios. All API calls are centralized in the `services/api.js` file.

## Authentication

User authentication is managed through the `AuthContext` which handles:

-   Login/Register
-   Storing JWT tokens
-   User session persistence
-   Logout functionality

## Dependencies

-   React Navigation for routing
-   AsyncStorage for local storage
-   Axios for API requests
-   Expo for development and building
-   React Native Elements for UI components
