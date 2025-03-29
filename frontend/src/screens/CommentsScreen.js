import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { commentOnPost } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const CommentsScreen = ({ route, navigation }) => {
    const { postId } = route.params;
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            setError(null);

            // In a real app, you would fetch comments from the API
            // For this example, we'll use mock data
            // const response = await getComments(postId);
            // setComments(response.data);

            // Mock data for demonstration
            setTimeout(() => {
                const mockComments = [
                    {
                        _id: "1",
                        user: {
                            _id: "101",
                            username: "john_doe",
                            profilePicture:
                                "https://randomuser.me/api/portraits/men/1.jpg",
                        },
                        text: "Great photo! I love the composition.",
                        createdAt: new Date(Date.now() - 3600000).toISOString(),
                    },
                    {
                        _id: "2",
                        user: {
                            _id: "102",
                            username: "jane_smith",
                            profilePicture:
                                "https://randomuser.me/api/portraits/women/1.jpg",
                        },
                        text: "The lighting is perfect!",
                        createdAt: new Date(Date.now() - 7200000).toISOString(),
                    },
                ];

                setComments(mockComments);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setError("Failed to load comments");
            setLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!comment.trim()) return;

        try {
            setSubmitting(true);

            // In a real app, you would send the comment to the API
            // const response = await commentOnPost(postId, comment);

            // For this example, we'll just add it locally
            const newComment = {
                _id: Date.now().toString(),
                user: {
                    _id: user.id,
                    username: user.username,
                    profilePicture: user.profilePicture,
                },
                text: comment,
                createdAt: new Date().toISOString(),
            };

            setComments([newComment, ...comments]);
            setComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
            setError("Failed to add comment");
        } finally {
            setSubmitting(false);
        }
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const commentDate = new Date(timestamp);
        const diffInSeconds = Math.floor((now - commentDate) / 1000);

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

        return commentDate.toLocaleDateString();
    };

    const renderItem = ({ item }) => (
        <View style={styles.commentItem}>
            <Image
                source={{
                    uri:
                        item.user.profilePicture ||
                        "https://via.placeholder.com/150",
                }}
                style={styles.avatar}
            />
            <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                    <Text style={styles.username}>{item.user.username}</Text>
                    <Text style={styles.timestamp}>
                        {formatTimeAgo(item.createdAt)}
                    </Text>
                </View>
                <Text style={styles.commentText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={90}
            >
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                {loading ? (
                    <View style={styles.centered}>
                        <ActivityIndicator size="large" color="#3897f0" />
                    </View>
                ) : (
                    <FlatList
                        data={comments}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={styles.commentsList}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    No comments yet. Be the first to comment!
                                </Text>
                            </View>
                        }
                    />
                )}

                <View style={styles.inputContainer}>
                    <Image
                        source={{
                            uri:
                                user?.profilePicture ||
                                "https://via.placeholder.com/150",
                        }}
                        style={styles.userAvatar}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment..."
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                    <TouchableOpacity
                        style={[
                            styles.sendButton,
                            !comment.trim() && styles.sendButtonDisabled,
                        ]}
                        onPress={handleAddComment}
                        disabled={!comment.trim() || submitting}
                    >
                        {submitting ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Ionicons
                                name="send"
                                size={24}
                                color={comment.trim() ? "#3897f0" : "#8e8e8e"}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        backgroundColor: "#ffcccc",
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    errorText: {
        color: "#cc0000",
        textAlign: "center",
    },
    commentsList: {
        flexGrow: 1,
        padding: 15,
    },
    commentItem: {
        flexDirection: "row",
        marginBottom: 20,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    username: {
        fontWeight: "bold",
        fontSize: 14,
        marginRight: 5,
    },
    timestamp: {
        fontSize: 12,
        color: "#8e8e8e",
    },
    commentText: {
        fontSize: 14,
        lineHeight: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#efefef",
        padding: 10,
        backgroundColor: "#fff",
    },
    userAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#efefef",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        maxHeight: 100,
    },
    sendButton: {
        marginLeft: 10,
        padding: 5,
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        height: 200,
    },
    emptyText: {
        textAlign: "center",
        color: "#8e8e8e",
    },
});

export default CommentsScreen;
