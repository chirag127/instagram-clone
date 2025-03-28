import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import API_URL from "../services/api";

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Mock search function (would be connected to the real API in production)
    const searchUsers = async (query) => {
        if (!query.trim()) {
            setUsers([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // This would be a real API call in production
            // const response = await axios.get(`${API_URL}/users/search?query=${query}`);
            // setUsers(response.data);

            // For demo purposes, we'll use mock data
            setTimeout(() => {
                const mockResults = [
                    {
                        _id: "1",
                        username: "john_doe",
                        profilePicture:
                            "https://randomuser.me/api/portraits/men/1.jpg",
                    },
                    {
                        _id: "2",
                        username: "jane_smith",
                        profilePicture:
                            "https://randomuser.me/api/portraits/women/1.jpg",
                    },
                    {
                        _id: "3",
                        username: "mike_wilson",
                        profilePicture:
                            "https://randomuser.me/api/portraits/men/2.jpg",
                    },
                ].filter((user) =>
                    user.username.toLowerCase().includes(query.toLowerCase())
                );

                setUsers(mockResults);
                setLoading(false);
            }, 500);
        } catch (error) {
            setError("Failed to search users");
            setLoading(false);
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            searchUsers(searchQuery);
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    const navigateToUserProfile = (userId) => {
        navigation.navigate("ProfileTab", {
            screen: "UserProfile",
            params: { userId },
        });
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity
            style={styles.userItem}
            onPress={() => navigateToUserProfile(item._id)}
        >
            <Image
                source={{
                    uri:
                        item.profilePicture ||
                        "https://via.placeholder.com/150",
                }}
                style={styles.profilePic}
            />
            <Text style={styles.username}>{item.username}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={20}
                    color="#8e8e8e"
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for users..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="none"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => setSearchQuery("")}
                    >
                        <Ionicons
                            name="close-circle"
                            size={20}
                            color="#8e8e8e"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3897f0" />
                </View>
            ) : users.length > 0 ? (
                <FlatList
                    data={users}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.usersList}
                />
            ) : searchQuery.length > 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No users found</Text>
                </View>
            ) : (
                <View style={styles.initialContainer}>
                    <Ionicons name="search" size={50} color="#8e8e8e" />
                    <Text style={styles.initialText}>Search for users</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    clearButton: {
        padding: 5,
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    usersList: {
        padding: 15,
    },
    userItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5",
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    username: {
        fontSize: 16,
        fontWeight: "500",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#8e8e8e",
        textAlign: "center",
    },
    initialContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    initialText: {
        fontSize: 16,
        color: "#8e8e8e",
        marginTop: 10,
    },
});

export default SearchScreen;
