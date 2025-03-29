# Instagram Clone Styling Guide

This document outlines the styling approach used to make the Instagram clone look more like the official Instagram app and website.

## Theme System

We've implemented a centralized theme system in `src/constants/theme.js` that contains:

-   **Colors**: Instagram's color palette including primary blue, grays, and UI colors
-   **Typography**: Font sizes and weights that match Instagram's typography
-   **Spacing**: Consistent spacing values for margins, padding, and layout
-   **Shadows**: Shadow styles for elements that need elevation

## Key UI Components

### Navigation

-   **Tab Bar**: Uses Feather icons with opacity changes for active/inactive states
-   **Headers**: Clean white headers with Instagram's logo in the center
-   **Navigation Transitions**: Smooth transitions between screens

### Posts

-   **Post Card**: Matches Instagram's post layout with proper spacing
-   **Like Button**: Red heart when liked, outline when not liked
-   **Action Buttons**: Properly sized and spaced action icons
-   **Comments**: Styled to match Instagram's comment display

### Profile

-   **Profile Header**: User image with follower stats
-   **Bio Section**: Properly styled user information
-   **Post Grid**: 3-column grid of square images with minimal spacing
-   **Follow Button**: Blue button that toggles between Follow/Following

### Authentication

-   **Login/Register**: Clean forms with Instagram's styling
-   **Input Fields**: Properly styled text inputs with error states
-   **Buttons**: Match Instagram's button styling and states

## How to Use

1. Import theme constants in your component:

    ```javascript
    import { COLORS, FONTS, SIZES } from "../constants/theme";
    ```

2. Use these constants in your styles:
    ```javascript
    const styles = StyleSheet.create({
        container: {
            backgroundColor: COLORS.white,
            padding: SIZES.md,
        },
        text: {
            fontSize: FONTS.md,
            color: COLORS.black,
        },
    });
    ```

## Instagram Design Guidelines

-   **Minimalist Design**: Clean, white backgrounds with minimal decoration
-   **Typography**: Sans-serif fonts with specific size hierarchy
-   **Color Usage**: Primarily black and white with blue accents for interactive elements
-   **Spacing**: Consistent spacing throughout the app
-   **Icons**: Simple, recognizable icons with consistent sizing

## Missing Assets

For a complete Instagram-like experience, you'll need to add:

-   Instagram logo text image for the header
-   Default profile picture
-   App icon and splash screen that match Instagram's branding

## Future Improvements

-   Add Instagram Stories feature with the colorful ring around profile pictures
-   Implement Instagram's double-tap to like functionality
-   Add Instagram's explore page grid layout
-   Implement Instagram's direct messaging UI
