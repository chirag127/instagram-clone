import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Text,
    SafeAreaView,
    StatusBar,
} from "react-native";
import Post from "../components/Post";
import { getFeed } from "../services/api";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const HomeScreen = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);

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
                renderItem={({ item }) => <Post post={item} />}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
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
});

export default HomeScreen;
