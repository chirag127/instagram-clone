import React, { useState, useContext } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { likePost } from "../services/api";
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
                    <MaterialIcons name="more-vert" size={24} color="black" />
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
                            size={28}
                            color={liked ? "red" : "black"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={navigateToComments}
                        style={styles.actionButton}
                    >
                        <Ionicons
                            name="chatbubble-outline"
                            size={26}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons
                            name="paper-plane-outline"
                            size={26}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={26} color="black" />
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
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    profilePic: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    username: {
        fontWeight: "bold",
        fontSize: 14,
    },
    postImage: {
        width: width,
        height: width,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    leftActions: {
        flexDirection: "row",
    },
    actionButton: {
        marginRight: 12,
    },
    likesCount: {
        fontWeight: "bold",
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    captionContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    caption: {
        marginLeft: 5,
        fontSize: 14,
    },
    viewComments: {
        color: "gray",
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    timestamp: {
        color: "gray",
        fontSize: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});

export default Post;
