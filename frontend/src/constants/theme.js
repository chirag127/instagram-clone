/**
 * Instagram Theme Constants
 * This file contains all the styling constants used throughout the app
 */

// Colors
export const COLORS = {
    // Primary colors
    primary: "#0095F6", // Instagram blue (buttons, links)
    black: "#262626", // Main text color
    white: "#FFFFFF", // White backgrounds

    // Grays
    lightGray: "#FAFAFA", // Background color
    gray: "#8E8E8E", // Secondary text
    mediumGray: "#DBDBDB", // Borders
    darkGray: "#262626", // Primary text

    // UI colors
    error: "#ED4956", // Error messages
    success: "#78DE45", // Success messages
    warning: "#FFCC00", // Warning messages

    // Social action colors
    like: "#ED4956", // Like/heart color
    link: "#0095F6", // Link color

    // Gradients (for stories and app icon)
    gradientStart: "#FCAF45", // Yellow/Orange
    gradientMiddle: "#E33963", // Pink/Red
    gradientEnd: "#B9348F", // Purple

    // Story ring gradient colors
    storyGradient1: "#FBAA47", // Orange
    storyGradient2: "#D91A46", // Red
    storyGradient3: "#A60F93", // Purple
    storyGradient4: "#3E1DC1", // Blue
};

// Typography
export const FONTS = {
    // Font families
    regular: "System", // Default system font
    medium: "System", // Medium weight
    bold: "System", // Bold weight

    // Font sizes
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
};

// Spacing
export const SIZES = {
    // Padding and margin
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,

    // Border radius
    borderRadiusSm: 4,
    borderRadiusMd: 8,
    borderRadiusLg: 12,
    borderRadiusXl: 24,

    // Icon sizes
    iconXs: 16,
    iconSm: 20,
    iconMd: 24,
    iconLg: 28,
    iconXl: 32,
};

// Shadows
export const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
};

export default { COLORS, FONTS, SIZES, SHADOWS };
