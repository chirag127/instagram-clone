import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../services/api";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

const EditProfileScreen = ({ navigation }) => {
    const { user: currentUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUserProfile();
        requestMediaLibraryPermissions();
    }, []);

    const requestMediaLibraryPermissions = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                "Sorry, we need camera roll permissions to upload photos!"
            );
        }
    };

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch user profile
            const response = await getUserProfile(currentUser.id);
            const userData = response.user;

            setUser(userData);
            setUsername(userData.username || "");
            setEmail(userData.email || "");
            setBio(userData.bio || "");
            setProfilePicture(userData.profilePicture || null);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setError("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!username) tempErrors.username = "Username is required";
        if (!email) tempErrors.email = "Email is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleUpdateProfile = async () => {
        if (!validate()) return;

        try {
            setSaving(true);
            setError(null);

            const updatedProfile = {
                username,
                bio,
                profilePicture,
            };

            // In a real app, you would upload the profile picture first
            // and then update the profile with the URL
            await updateUserProfile(updatedProfile);

            Alert.alert("Success", "Profile updated successfully");
            navigation.goBack();
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                setProfilePicture(result.uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Failed to pick image");
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3897f0" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.profilePictureContainer}>
                        <Image
                            source={{
                                uri:
                                    profilePicture ||
                                    "https://via.placeholder.com/150",
                            }}
                            style={styles.profilePicture}
                        />
                        <TouchableOpacity
                            style={styles.changePhotoButton}
                            onPress={pickImage}
                        >
                            <Text style={styles.changePhotoText}>
                                Change Profile Photo
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formContainer}>
                        <FormInput
                            label="Username"
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            error={errors.username}
                        />

                        <FormInput
                            label="Email"
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            error={errors.email}
                            editable={false} // Email is not editable for security reasons
                        />

                        <FormInput
                            label="Bio"
                            placeholder="Write a bio..."
                            value={bio}
                            onChangeText={setBio}
                            multiline
                            numberOfLines={4}
                            style={styles.bioInput}
                        />

                        <Button
                            title="Save"
                            onPress={handleUpdateProfile}
                            loading={saving}
                            disabled={saving}
                            style={styles.saveButton}
                        />

                        <Button
                            title="Cancel"
                            onPress={() => navigation.goBack()}
                            type="secondary"
                            style={styles.cancelButton}
                        />
                    </View>
                </ScrollView>
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
    profilePictureContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changePhotoButton: {
        marginTop: 10,
    },
    changePhotoText: {
        color: "#3897f0",
        fontSize: 16,
    },
    formContainer: {
        padding: 20,
    },
    bioInput: {
        height: 100,
        textAlignVertical: "top",
    },
    saveButton: {
        marginTop: 20,
    },
    cancelButton: {
        marginTop: 10,
    },
});

export default EditProfileScreen;
