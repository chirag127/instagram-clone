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

## Instagram UI Styling Implementation

We've implemented the following Instagram-like UI features to make our clone closely resemble the official Instagram app:

### Navigation and Layout

-   Instagram's logo in the top header
-   Bottom tab navigation with Instagram-like icons
-   Proper icon selection for active/inactive states
-   Camera icon in the header's left side, and messaging/likes on the right
-   Clean, minimalist white design with subtle borders

### Home Feed

-   Stories at the top with gradient borders and circular images
-   Story rings with Instagram's gradient coloring
-   "Your Story" with plus button for adding new stories
-   Horizontally scrollable stories list

### Posts

-   Header with profile picture and username
-   Double-tap to like functionality
-   Post image with proper spacing
-   Action buttons (like, comment, share) with Instagram's styling
-   Like counts and caption formatting
-   Properly styled timestamps
-   View all comments link

### Profile Page

-   Profile stats layout (posts, followers, following)
-   Bio section with proper styling
-   Follow/Following button that toggles states
-   Edit Profile button for own profile
-   Stories highlights section with circular previews
-   Grid/Tagged photos tabs
-   3-column photo grid with proper spacing

### Colors and Typography

-   Used Instagram's official colors for elements:
    -   Primary blue (#0095F6) for buttons and links
    -   Like/heart color (#ED4956)
    -   Proper grays for text and borders
    -   Story gradient colors
-   Proper font sizes and weights across the app

### Additional UI Elements

-   Added web scraper tool to reference Instagram's styling
-   Implemented loading states
-   Empty states for no posts

This styling creates a cohesive Instagram-like experience throughout the app while maintaining good performance and responsiveness.
