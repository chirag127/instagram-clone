import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Post from "../components/Post";
import { getPostComments } from "../services/api";

const { width } = Dimensions.get("window");

const PostDetailScreen = ({ route }) => {
    const { post } = route.params;
    const navigation = useNavigation();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // In a real app, you would fetch the full post details and comments
        // For this example, we'll just use the post data passed from route params
        if (post && post._id) {
            fetchComments();
        }
    }, [post]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            setError(null);

            // This would be a real API call in a production app
            // const response = await getPostComments(post._id);
            // setComments(response.data);

            // For demo purposes, we'll just use the comments already in the post
            setComments(post.comments || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setError("Failed to load comments");
        } finally {
            setLoading(false);
        }
    };

    const navigateToComments = () => {
        navigation.navigate("Comments", { postId: post._id });
    };

    if (!post) {
        return (
            <View style={styles.centered}>
                <Text>Post not found</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* We're reusing the Post component here for consistency */}
                <Post post={post} />

                {/* Comments Section */}
                <View style={styles.commentsSection}>
                    <View style={styles.commentsHeader}>
                        <Text style={styles.commentsTitle}>Comments</Text>
                        <TouchableOpacity onPress={navigateToComments}>
                            <Text style={styles.viewAllText}>View all</Text>
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <ActivityIndicator
                            size="small"
                            color="#3897f0"
                            style={styles.loader}
                        />
                    ) : error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : comments.length === 0 ? (
                        <Text style={styles.noCommentsText}>
                            No comments yet. Be the first to comment!
                        </Text>
                    ) : (
                        comments.slice(0, 3).map((comment, index) => (
                            <View key={index} style={styles.commentItem}>
                                <Image
                                    source={{
                                        uri:
                                            comment.user.profilePicture ||
                                            "https://via.placeholder.com/150",
                                    }}
                                    style={styles.commentUserPic}
                                />
                                <View style={styles.commentContent}>
                                    <Text style={styles.commentUsername}>
                                        {comment.user.username}
                                    </Text>
                                    <Text style={styles.commentText}>
                                        {comment.text}
                                    </Text>
                                </View>
                            </View>
                        ))
                    )}

                    <TouchableOpacity
                        style={styles.addCommentButton}
                        onPress={navigateToComments}
                    >
                        <Text style={styles.addCommentText}>
                            Add a comment...
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    commentsSection: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: "#efefef",
    },
    commentsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    commentsTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    viewAllText: {
        color: "#3897f0",
        fontSize: 14,
    },
    commentItem: {
        flexDirection: "row",
        marginBottom: 15,
    },
    commentUserPic: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentUsername: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
    },
    loader: {
        marginVertical: 20,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginVertical: 20,
    },
    noCommentsText: {
        textAlign: "center",
        color: "#8e8e8e",
        marginVertical: 20,
    },
    addCommentButton: {
        marginTop: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#efefef",
    },
    addCommentText: {
        color: "#8e8e8e",
    },
});

export default PostDetailScreen;
