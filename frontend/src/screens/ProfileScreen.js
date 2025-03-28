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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getUserProfile, getUserPosts, followUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";

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
                <ActivityIndicator size="large" color="#3897f0" />
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
        backgroundColor: "#fff",
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
    profileHeader: {
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    statsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        marginLeft: 15,
    },
    stat: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: 12,
        color: "#8e8e8e",
    },
    bioContainer: {
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    username: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    bio: {
        fontSize: 14,
    },
    actionContainer: {
        flexDirection: "row",
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
    },
    postsContainer: {
        flex: 1,
    },
    postsHeader: {
        borderTopWidth: 1,
        borderTopColor: "#efefef",
        paddingVertical: 10,
        marginBottom: 5,
    },
    postsHeaderText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14,
    },
    postsGrid: {
        marginHorizontal: 1,
    },
    imageContainer: {
        width: imageSize,
        height: imageSize,
        margin: 1,
    },
    postImage: {
        width: "100%",
        height: "100%",
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
    },
    emptyText: {
        fontSize: 14,
        color: "#8e8e8e",
        marginTop: 10,
    },
});

export default ProfileScreen;
