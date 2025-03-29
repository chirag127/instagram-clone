import React, { useState, useContext } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { likePost } from "../services/mockApi";
import { AuthContext } from "../context/AuthContext";

const { width } = Dimensions.get("window");

const Post = ({ post }) => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState(post.likes.includes(user?.id));
    const [likesCount, setLikesCount] = useState(post.likes.length);

    const handleLike = async () => {
        try {
            await likePost(post._id);
            setLiked(!liked);
            setLikesCount(liked ? likesCount - 1 : likesCount + 1);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const navigateToComments = () => {
        navigation.navigate("Comments", { postId: post._id });
    };

    const navigateToProfile = () => {
        navigation.navigate("ProfileTab", {
            screen: "UserProfile",
            params: { userId: post.user._id },
        });
    };

    const navigateToPostDetail = () => {
        navigation.navigate("PostDetail", { post });
    };

    // Format timestamp to readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return "just now";
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays}d ago`;
        }

        return date.toLocaleDateString();
    };

    return (
        <View style={styles.container}>
            {/* Post Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigateToProfile}
                    style={styles.userInfo}
                >
                    <Image
                        source={{
                            uri:
                                post.user.profilePicture ||
                                "https://via.placeholder.com/150",
                        }}
                        style={styles.profilePic}
                    />
                    <Text style={styles.username}>{post.user.username}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons
                        name="more-vert"
                        size={22}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </View>

            {/* Post Image */}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={navigateToPostDetail}
            >
                <Image
                    source={{ uri: post.image }}
                    style={styles.postImage}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            {/* Post Actions */}
            <View style={styles.actions}>
                <View style={styles.leftActions}>
                    <TouchableOpacity
                        onPress={handleLike}
                        style={styles.actionButton}
                    >
                        <Ionicons
                            name={liked ? "heart" : "heart-outline"}
                            size={26}
                            color={liked ? COLORS.like : COLORS.black}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={navigateToComments}
                        style={styles.actionButton}
                    >
                        <Ionicons
                            name="chatbubble-outline"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons
                            name="paper-plane-outline"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Ionicons
                        name="bookmark-outline"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </View>

            {/* Likes Count */}
            <Text style={styles.likesCount}>{likesCount} likes</Text>

            {/* Caption */}
            {post.caption && (
                <View style={styles.captionContainer}>
                    <Text style={styles.username}>{post.user.username}</Text>
                    <Text style={styles.caption}>{post.caption}</Text>
                </View>
            )}

            {/* Comments Preview */}
            {post.comments.length > 0 && (
                <TouchableOpacity onPress={navigateToComments}>
                    <Text style={styles.viewComments}>
                        View all {post.comments.length} comments
                    </Text>
                </TouchableOpacity>
            )}

            {/* Timestamp */}
            <Text style={styles.timestamp}>{formatDate(post.createdAt)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        marginBottom: SIZES.md,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.mediumGray,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: SIZES.md,
        paddingVertical: SIZES.sm,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePic: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: SIZES.sm,
        borderWidth: 0.5,
        borderColor: COLORS.mediumGray,
    },
    username: {
        fontWeight: "600",
        fontSize: FONTS.sm,
        color: COLORS.black,
    },
    postImage: {
        width: width,
        height: width,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: SIZES.md,
        paddingVertical: SIZES.sm,
    },
    leftActions: {
        flexDirection: "row",
    },
    actionButton: {
        marginRight: SIZES.lg,
    },
    likesCount: {
        fontWeight: "600",
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.xs,
        fontSize: FONTS.sm,
        color: COLORS.black,
    },
    captionContainer: {
        flexDirection: "row",
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.xs,
    },
    caption: {
        marginLeft: SIZES.xs,
        fontSize: FONTS.sm,
        color: COLORS.black,
    },
    viewComments: {
        color: COLORS.gray,
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.xs,
        fontSize: FONTS.sm,
    },
    timestamp: {
        color: COLORS.gray,
        fontSize: FONTS.xxs,
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.md,
        marginTop: SIZES.xs,
    },
});

export default Post;
