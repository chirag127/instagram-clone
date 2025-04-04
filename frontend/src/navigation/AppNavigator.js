import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
} from "@expo/vector-icons";
import { Image, View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

// Screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import CommentsScreen from "../screens/CommentsScreen";

// Context
import { AuthContext } from "../context/AuthContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack Navigator
const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

// Instagram Logo Header Component
const InstagramLogoTitle = () => (
    <Image
        source={require("../../assets/instagram-logo-text.svg")}
        style={{ height: 30, width: 105 }}
        resizeMode="contain"
    />
);

// Home Stack Navigator
const HomeStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: COLORS.white,
                shadowColor: COLORS.mediumGray,
                elevation: 2,
            },
            headerTitleStyle: {
                fontWeight: "600",
            },
        }}
    >
        <Stack.Screen
            name="Feed"
            component={HomeScreen}
            options={{
                headerTitle: () => <InstagramLogoTitle />,
                headerRight: () => (
                    <View
                        style={{ flexDirection: "row", marginRight: SIZES.md }}
                    >
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color={COLORS.black}
                            style={{ marginRight: SIZES.md }}
                        />
                        <Feather name="send" size={24} color={COLORS.black} />
                    </View>
                ),
                headerLeft: () => (
                    <View style={{ marginLeft: SIZES.md }}>
                        <Feather name="camera" size={24} color={COLORS.black} />
                    </View>
                ),
            }}
        />
        <Stack.Screen
            name="PostDetail"
            component={PostDetailScreen}
            options={{ headerTitle: "Post" }}
        />
        <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{ headerTitle: "Comments" }}
        />
    </Stack.Navigator>
);

// Profile Stack Navigator
const ProfileStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: COLORS.white,
                shadowColor: COLORS.mediumGray,
                elevation: 2,
            },
            headerTitleStyle: {
                fontWeight: "600",
                fontSize: FONTS.md,
            },
        }}
    >
        <Stack.Screen
            name="UserProfile"
            component={ProfileScreen}
            options={({ route }) => ({
                headerTitle: route.params?.username || "Profile",
                headerTitleAlign: "center",
                headerRight: () => (
                    <Feather
                        name="menu"
                        size={24}
                        color={COLORS.black}
                        style={{ marginRight: SIZES.md }}
                    />
                ),
            })}
        />
        <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerTitle: "Edit Profile" }}
        />
    </Stack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: COLORS.black,
            tabBarInactiveTintColor: COLORS.black,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.white,
                borderTopColor: COLORS.mediumGray,
                height: 50,
                paddingBottom: 5,
            },
        }}
    >
        <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "home" : "home-outline"}
                        color={COLORS.black}
                        size={25}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "search" : "search-outline"}
                        color={COLORS.black}
                        size={25}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name={focused ? "add-circle" : "add-circle-outline"}
                        color={COLORS.black}
                        size={25}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="ProfileTab"
            component={ProfileStack}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        {focused ? (
                            <Image
                                source={require("../../assets/default-profile-picture.svg")}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Ionicons
                                name="person-outline"
                                color={COLORS.black}
                                size={25}
                            />
                        )}
                    </View>
                ),
            }}
        />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    activeProfileIcon: {
        borderRadius: 50,
        padding: 2,
        borderWidth: 1,
        borderColor: COLORS.black,
    },
    profileImage: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        borderWidth: 1,
        borderColor: COLORS.black,
    },
});

// Main Application Navigator
const AppNavigator = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // You could return a loading screen here
        return null;
    }

    return (
        <NavigationContainer>
            {user ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigator;
