import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Dimensions,
    RefreshControl,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { getUserProfile, getUserPosts, followUser } from "../services/mockApi";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const { width } = Dimensions.get("window");
const imageSize = width / 3 - 2;

const ProfileScreen = ({ route, navigation }) => {
    const { userId: profileUserId } = route.params || {};
    const { user: currentUser, logout } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [following, setFollowing] = useState(false);
    const [stats, setStats] = useState({
        posts: 0,
        followers: 0,
        following: 0,
    });
    const [error, setError] = useState(null);

    // Determine if viewing own profile
    const isOwnProfile = !profileUserId || profileUserId === currentUser?.id;
    const userId = isOwnProfile ? currentUser?.id : profileUserId;

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch user profile
            const profileData = await getUserProfile(userId);
            setUser(profileData.user);
            setStats(profileData.stats);

            // Check if current user is following this profile
            if (!isOwnProfile && profileData.user.followers) {
                setFollowing(
                    profileData.user.followers.some(
                        (follower) => follower._id === currentUser?.id
                    )
                );
            }

            // Fetch user posts
            const postsData = await getUserPosts(userId);
            setPosts(postsData);
        } catch (error) {
            setError("Failed to load profile data");
            console.error("Error fetching profile data:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchUserData();
    };

    const handleFollow = async () => {
        try {
            const response = await followUser(userId);
            setFollowing(response.following);
            setStats((prev) => ({
                ...prev,
                followers: response.followersCount,
            }));
        } catch (error) {
            console.error("Error following/unfollowing:", error);
        }
    };

    const handleEditProfile = () => {
        navigation.navigate("EditProfile");
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => navigation.navigate("PostDetail", { post: item })}
        >
            <Image source={{ uri: item.image }} style={styles.postImage} />
        </TouchableOpacity>
    );

    if (loading && !refreshing) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                {user && (
                    <>
                        {/* Profile Header */}
                        <View style={styles.profileHeader}>
                            <Image
                                source={{
                                    uri:
                                        user.profilePicture ||
                                        "https://via.placeholder.com/150",
                                }}
                                style={styles.profileImage}
                            />
                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <Text style={styles.statNumber}>
                                        {stats.posts}
                                    </Text>
                                    <Text style={styles.statLabel}>Posts</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statNumber}>
                                        {stats.followers}
                                    </Text>
                                    <Text style={styles.statLabel}>
                                        Followers
                                    </Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statNumber}>
                                        {stats.following}
                                    </Text>
                                    <Text style={styles.statLabel}>
                                        Following
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Bio */}
                        <View style={styles.bioContainer}>
                            <Text style={styles.username}>{user.username}</Text>
                            {user.bio && (
                                <Text style={styles.bio}>{user.bio}</Text>
                            )}
                        </View>

                        {/* Action Button */}
                        <View style={styles.actionContainer}>
                            {isOwnProfile ? (
                                <>
                                    <Button
                                        title="Edit Profile"
                                        type="secondary"
                                        onPress={handleEditProfile}
                                        style={styles.actionButton}
                                    />
                                    <Button
                                        title="Logout"
                                        type="secondary"
                                        onPress={logout}
                                        style={[
                                            styles.actionButton,
                                            { marginLeft: 10 },
                                        ]}
                                    />
                                </>
                            ) : (
                                <Button
                                    title={following ? "Following" : "Follow"}
                                    type={following ? "secondary" : "primary"}
                                    onPress={handleFollow}
                                    style={styles.actionButton}
                                />
                            )}
                        </View>

                        {/* Posts Grid */}
                        <View style={styles.postsContainer}>
                            <View style={styles.postsHeader}>
                                <Text style={styles.postsHeaderText}>
                                    Posts
                                </Text>
                            </View>

                            {posts.length === 0 ? (
                                <View style={styles.emptyContainer}>
                                    <Ionicons
                                        name="images-outline"
                                        size={50}
                                        color="#8e8e8e"
                                    />
                                    <Text style={styles.emptyText}>
                                        No Posts Yet
                                    </Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={posts}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item._id}
                                    numColumns={3}
                                    scrollEnabled={false}
                                    contentContainerStyle={styles.postsGrid}
                                />
                            )}
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
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
    errorContainer: {
        backgroundColor: COLORS.error,
        padding: SIZES.md,
        margin: SIZES.md,
        borderRadius: SIZES.borderRadiusSm,
        opacity: 0.7,
    },
    errorText: {
        color: COLORS.white,
        textAlign: "center",
        fontSize: FONTS.sm,
    },
    profileHeader: {
        flexDirection: "row",
        padding: SIZES.md,
        alignItems: "center",
    },
    profileImage: {
        width: 86,
        height: 86,
        borderRadius: 43,
        borderWidth: 0.5,
        borderColor: COLORS.mediumGray,
    },
    statsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginLeft: SIZES.md,
    },
    stat: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: FONTS.lg,
        fontWeight: "600",
        color: COLORS.black,
    },
    statLabel: {
        fontSize: FONTS.xs,
        color: COLORS.gray,
        marginTop: 2,
    },
    bioContainer: {
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.md,
    },
    username: {
        fontWeight: "600",
        fontSize: FONTS.md,
        marginBottom: SIZES.xs,
        color: COLORS.black,
    },
    bio: {
        fontSize: FONTS.sm,
        color: COLORS.black,
        lineHeight: 20,
    },
    actionContainer: {
        flexDirection: "row",
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.lg,
    },
    actionButton: {
        flex: 1,
    },
    postsContainer: {
        flex: 1,
    },
    postsHeader: {
        borderTopWidth: 0.5,
        borderTopColor: COLORS.mediumGray,
        paddingVertical: SIZES.md,
        marginBottom: SIZES.xs,
    },
    postsHeaderText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: FONTS.sm,
        color: COLORS.black,
    },
    postsGrid: {
        marginHorizontal: 0.5,
    },
    imageContainer: {
        width: imageSize,
        height: imageSize,
        margin: 0.5,
    },
    postImage: {
        width: "100%",
        height: "100%",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: SIZES.xxl,
    },
    emptyText: {
        fontSize: FONTS.sm,
        color: COLORS.gray,
        marginTop: SIZES.md,
        textAlign: "center",
    },
});

export default ProfileScreen;
