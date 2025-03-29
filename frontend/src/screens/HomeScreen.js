import React, { useState, useEffect, useCallback, useContext } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Text,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Post from "../components/Post";
import { getFeed } from "../services/mockApi";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { AuthContext } from "../context/AuthContext";

// Mock stories data
const STORIES = [
    {
        id: "story1",
        username: "Your Story",
        image: "https://via.placeholder.com/150",
        isMyStory: true,
        hasStory: false,
    },
    {
        id: "story2",
        username: "janedoe",
        image: "https://via.placeholder.com/150?text=Jane",
        hasStory: true,
    },
    {
        id: "story3",
        username: "mike_smith",
        image: "https://via.placeholder.com/150?text=Mike",
        hasStory: true,
    },
    {
        id: "story4",
        username: "sara.design",
        image: "https://via.placeholder.com/150?text=Sara",
        hasStory: true,
    },
    {
        id: "story5",
        username: "alexcool",
        image: "https://via.placeholder.com/150?text=Alex",
        hasStory: true,
    },
    {
        id: "story6",
        username: "thomas_p",
        image: "https://via.placeholder.com/150?text=Tom",
        hasStory: true,
    },
];

const StoryItem = ({ story }) => (
    <TouchableOpacity style={styles.storyItem}>
        <View
            style={[
                styles.storyRing,
                { borderColor: story.hasStory ? undefined : COLORS.mediumGray },
                story.isMyStory && styles.myStoryRing,
            ]}
        >
            <Image source={{ uri: story.image }} style={styles.storyImage} />
            {story.isMyStory && (
                <View style={styles.addStoryButton}>
                    <Text style={styles.addStoryIcon}>+</Text>
                </View>
            )}
        </View>
        <Text style={styles.storyUsername} numberOfLines={1}>
            {story.username}
        </Text>
    </TouchableOpacity>
);

const StoriesSection = () => (
    <View style={styles.storiesContainer}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesScrollView}
        >
            {STORIES.map((story) => (
                <StoryItem key={story.id} story={story} />
            ))}
        </ScrollView>
        <View style={styles.storiesDivider} />
    </View>
);

const HomeScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const fetchPosts = useCallback(async (pageNum = 1, refresh = false) => {
        try {
            setError(null);
            if (pageNum === 1) {
                setLoading(true);
            }

            const response = await getFeed(pageNum);

            if (refresh || pageNum === 1) {
                setPosts(response.posts);
            } else {
                setPosts((prevPosts) => [...prevPosts, ...response.posts]);
            }

            setTotalPages(response.totalPages);
            setPage(response.currentPage);
        } catch (error) {
            setError("Failed to load posts. Pull down to refresh.");
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPosts(1, true);
    }, [fetchPosts]);

    const handleLoadMore = useCallback(() => {
        if (page < totalPages && !loading) {
            fetchPosts(page + 1);
        }
    }, [fetchPosts, page, totalPages, loading]);

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    };

    const renderItem = ({ item }) => <Post post={item} />;

    const ListHeaderComponent = () => <StoriesSection />;

    if (loading && posts.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeaderComponent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={COLORS.primary}
                    />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={
                    !loading && (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>
                                No posts yet. Follow users to see their posts
                                here.
                            </Text>
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
    },
    footer: {
        paddingVertical: SIZES.lg,
        borderTopWidth: 0.5,
        borderTopColor: COLORS.mediumGray,
    },
    errorContainer: {
        backgroundColor: COLORS.error,
        padding: SIZES.md,
        marginBottom: SIZES.xs,
        opacity: 0.7,
    },
    errorText: {
        color: COLORS.white,
        textAlign: "center",
        fontSize: FONTS.sm,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: SIZES.lg,
        height: 300,
    },
    emptyText: {
        fontSize: FONTS.md,
        color: COLORS.gray,
        textAlign: "center",
        lineHeight: 22,
    },
    storiesContainer: {
        backgroundColor: COLORS.white,
    },
    storiesScrollView: {
        paddingVertical: SIZES.sm,
        paddingHorizontal: SIZES.sm,
    },
    storyItem: {
        alignItems: "center",
        marginHorizontal: SIZES.xs,
        width: 70,
    },
    storyRing: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: SIZES.xs,
        borderColor: "transparent",
        padding: 2,
        backgroundColor: COLORS.white,
        // Create a gradient-like effect with multiple colors for the border
        borderWidth: 2,
        borderColor: COLORS.storyGradient1,
        borderRightColor: COLORS.storyGradient2,
        borderBottomColor: COLORS.storyGradient3,
        borderLeftColor: COLORS.storyGradient4,
    },
    myStoryRing: {
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
    },
    storyImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.lightGray,
    },
    storyUsername: {
        fontSize: FONTS.xxs,
        color: COLORS.black,
        textAlign: "center",
        width: 65,
    },
    addStoryButton: {
        position: "absolute",
        bottom: -5,
        right: -5,
        backgroundColor: COLORS.primary,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: COLORS.white,
    },
    addStoryIcon: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "bold",
    },
    storiesDivider: {
        height: 0.5,
        backgroundColor: COLORS.mediumGray,
        marginTop: SIZES.xs,
    },
});

export default HomeScreen;
