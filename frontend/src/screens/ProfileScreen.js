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
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const imageSize = width / 3 - 2;
const numColumns = 3;
const ITEM_WIDTH = width / numColumns;

const ProfileHeader = ({ profile, isOwnProfile, loading }) => {
    const navigation = useNavigation();
    const [followed, setFollowed] = useState(profile?.isFollowing || false);

    const handleEditProfile = () => {
        navigation.navigate("EditProfile");
    };

    const handleFollow = () => {
        setFollowed(!followed);
        // API call to follow/unfollow would go here
    };

    if (loading) {
        return (
            <View style={styles.loadingHeader}>
                <ActivityIndicator color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.headerContainer}>
            {/* Profile pic and stats */}
            <View style={styles.profileInfoContainer}>
                <View style={styles.profileImageContainer}>
                    <Image
                        source={{
                            uri:
                                profile?.profilePicture ||
                                "https://via.placeholder.com/150",
                        }}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>
                            {profile?.postsCount || 0}
                        </Text>
                        <Text style={styles.statLabel}>Posts</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>
                            {profile?.followers || 0}
                        </Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>

                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>
                            {profile?.following || 0}
                        </Text>
                        <Text style={styles.statLabel}>Following</Text>
                    </View>
                </View>
            </View>

            {/* Bio section */}
            <View style={styles.bioContainer}>
                <Text style={styles.displayName}>{profile?.name}</Text>
                {profile?.bio && <Text style={styles.bio}>{profile.bio}</Text>}
                {profile?.website && (
                    <Text style={styles.website}>{profile.website}</Text>
                )}
            </View>

            {/* Action buttons */}
            <View style={styles.actionButtonsContainer}>
                {isOwnProfile ? (
                    <TouchableOpacity
                        style={styles.editProfileButton}
                        onPress={handleEditProfile}
                    >
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={[
                                styles.followButton,
                                followed && styles.followingButton,
                            ]}
                            onPress={handleFollow}
                        >
                            <Text
                                style={[
                                    styles.followButtonText,
                                    followed && styles.followingButtonText,
                                ]}
                            >
                                {followed ? "Following" : "Follow"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.messageButton}>
                            <Text style={styles.messageButtonText}>
                                Message
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.moreButton}>
                            <Ionicons
                                name="chevron-down"
                                size={16}
                                color={COLORS.black}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Highlights */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.highlightsContainer}
                contentContainerStyle={styles.highlightsContent}
            >
                <TouchableOpacity style={styles.highlightItem}>
                    <View style={styles.highlightCircle}>
                        <Ionicons name="add" size={24} color={COLORS.black} />
                    </View>
                    <Text style={styles.highlightText}>New</Text>
                </TouchableOpacity>

                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                        <TouchableOpacity
                            key={`highlight_${index}`}
                            style={styles.highlightItem}
                        >
                            <View style={styles.highlightCircle}>
                                <Image
                                    source={{
                                        uri: `https://via.placeholder.com/80?text=${
                                            index + 1
                                        }`,
                                    }}
                                    style={styles.highlightImage}
                                />
                            </View>
                            <Text style={styles.highlightText}>
                                Highlight {index + 1}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Ionicons
                        name="grid-outline"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Ionicons
                        name="person-outline"
                        size={24}
                        color={COLORS.gray}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const EmptyPostsComponent = ({ isOwnProfile }) => (
    <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
            <Ionicons name="camera-outline" size={50} color={COLORS.black} />
        </View>
        <Text style={styles.emptyTitle}>No Posts Yet</Text>
        <Text style={styles.emptyText}>
            {isOwnProfile
                ? "When you share photos, they'll appear on your profile."
                : "When this user shares photos, they'll appear here."}
        </Text>
        {isOwnProfile && (
            <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>
                    Share Your First Photo
                </Text>
            </TouchableOpacity>
        )}
    </View>
);

const ProfileScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Check if viewing own profile or another user's
    const userId = route.params?.userId || user.id;
    const isOwnProfile = userId === user.id;

    useEffect(() => {
        fetchProfile();
    }, [userId]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getUserProfile(userId);
            setProfile(data.profile);
            setPosts(data.posts);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProfile();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.postItem}>
            <Image
                source={{ uri: item.image }}
                style={styles.postImage}
                resizeMode="cover"
            />
            {item.multipleImages && (
                <View style={styles.multipleImagesIcon}>
                    <Ionicons
                        name="copy-outline"
                        size={16}
                        color={COLORS.white}
                    />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={numColumns}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={COLORS.primary}
                    />
                }
                ListHeaderComponent={
                    <ProfileHeader
                        profile={profile}
                        isOwnProfile={isOwnProfile}
                        loading={loading && !refreshing}
                    />
                }
                ListEmptyComponent={
                    !loading && (
                        <EmptyPostsComponent isOwnProfile={isOwnProfile} />
                    )
                }
                showsVerticalScrollIndicator={false}
                initialNumToRender={12}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    loadingHeader: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        paddingHorizontal: SIZES.md,
        paddingTop: SIZES.md,
    },
    profileInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SIZES.md,
    },
    profileImageContainer: {
        marginRight: SIZES.lg,
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
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.black,
    },
    statLabel: {
        fontSize: 13,
        color: COLORS.black,
    },
    bioContainer: {
        marginBottom: SIZES.md,
    },
    displayName: {
        fontWeight: "600",
        fontSize: FONTS.sm,
        marginBottom: 2,
    },
    bio: {
        fontSize: FONTS.sm,
        color: COLORS.black,
        marginBottom: 2,
    },
    website: {
        fontSize: FONTS.sm,
        color: COLORS.primary,
    },
    actionButtonsContainer: {
        marginBottom: SIZES.md,
    },
    actionButtonsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    editProfileButton: {
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
        borderRadius: 4,
        paddingVertical: 6,
        alignItems: "center",
        backgroundColor: COLORS.white,
    },
    editProfileText: {
        fontSize: FONTS.sm,
        fontWeight: "600",
        color: COLORS.black,
    },
    followButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 4,
        paddingVertical: 6,
        alignItems: "center",
        marginRight: SIZES.xs,
    },
    followingButton: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
    },
    followButtonText: {
        fontSize: FONTS.sm,
        fontWeight: "600",
        color: COLORS.white,
    },
    followingButtonText: {
        color: COLORS.black,
    },
    messageButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
        borderRadius: 4,
        paddingVertical: 6,
        alignItems: "center",
        marginHorizontal: SIZES.xs,
    },
    messageButtonText: {
        fontSize: FONTS.sm,
        fontWeight: "600",
        color: COLORS.black,
    },
    moreButton: {
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
        borderRadius: 4,
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    highlightsContainer: {
        marginBottom: SIZES.md,
    },
    highlightsContent: {
        paddingVertical: SIZES.sm,
    },
    highlightItem: {
        alignItems: "center",
        marginRight: SIZES.md,
        width: 75,
    },
    highlightCircle: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    highlightImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    highlightText: {
        fontSize: 11,
        color: COLORS.black,
        textAlign: "center",
    },
    tabsContainer: {
        flexDirection: "row",
        borderTopWidth: 0.5,
        borderTopColor: COLORS.mediumGray,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: SIZES.sm,
    },
    activeTab: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.black,
    },
    postItem: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        position: "relative",
    },
    postImage: {
        width: ITEM_WIDTH - 1,
        height: ITEM_WIDTH - 1,
        margin: 0.5,
    },
    multipleImagesIcon: {
        position: "absolute",
        top: 8,
        right: 8,
    },
    emptyContainer: {
        padding: SIZES.xl,
        alignItems: "center",
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: COLORS.black,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: SIZES.md,
    },
    emptyTitle: {
        fontSize: FONTS.lg,
        fontWeight: "600",
        color: COLORS.black,
        marginBottom: SIZES.xs,
    },
    emptyText: {
        textAlign: "center",
        color: COLORS.gray,
        marginBottom: SIZES.lg,
    },
    shareButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 4,
        paddingVertical: SIZES.sm,
        paddingHorizontal: SIZES.lg,
    },
    shareButtonText: {
        color: COLORS.white,
        fontWeight: "600",
    },
});

export default ProfileScreen;
