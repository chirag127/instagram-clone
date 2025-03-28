import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

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

// Home Stack Navigator
const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Feed"
            component={HomeScreen}
            options={{ headerTitle: "Instagram" }}
        />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
    </Stack.Navigator>
);

// Profile Stack Navigator
const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="UserProfile"
            component={ProfileScreen}
            options={{ headerTitle: "Profile" }}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#000",
            headerShown: false,
        }}
    >
        <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={size}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="search" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="add-box" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="ProfileTab"
            component={ProfileStack}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name="account-circle"
                        color={color}
                        size={size}
                    />
                ),
            }}
        />
    </Tab.Navigator>
);

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
