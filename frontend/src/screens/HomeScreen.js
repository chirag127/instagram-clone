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
                <ActivityIndicator size="large" color="#3897f0" />
            </View>
        );
    };

    if (loading && posts.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3897f0" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

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
        backgroundColor: "#fff",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    footer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: "#f5f5f5",
    },
    errorContainer: {
        backgroundColor: "#ffcccc",
        padding: 10,
        marginBottom: 5,
    },
    errorText: {
        color: "#cc0000",
        textAlign: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        height: 300,
    },
    emptyText: {
        fontSize: 16,
        color: "#8e8e8e",
        textAlign: "center",
    },
});

export default HomeScreen;
