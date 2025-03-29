import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    ActivityIndicator,
    Alert,
    SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "../services/mockApi";
import Button from "../components/Button";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const CreatePostScreen = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission Denied",
                    "Sorry, we need camera roll permissions to upload images!"
                );
            }
        })();
    }, []);

    // Update the UI icons to match Instagram's style
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: "New Post",
            headerTitleStyle: {
                fontWeight: "600",
                fontSize: FONTS.md,
                color: COLORS.black,
            },
            headerStyle: {
                backgroundColor: COLORS.white,
                shadowColor: COLORS.mediumGray,
                elevation: 2,
            },
        });
    }, [navigation]);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: [ImagePicker.MediaType.IMAGE],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
            setError("Failed to pick image");
        }
    };

    const handleCreatePost = async () => {
        if (!image) {
            setError("Please select an image");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // In a real app, you would upload the image to a server first
            // and get a URL. For this example, we'll just use the local URI
            const postData = {
                image, // In real app, this would be the URL from the server
                caption,
                location,
                tags,
            };

            await createPost(postData);

            // Reset form and navigate to home
            setImage(null);
            setCaption("");
            setLocation("");
            setTags("");

            navigation.navigate("HomeTab");
        } catch (error) {
            console.error("Error creating post:", error);
            setError("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Header is now handled by navigation options */}

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                <View style={styles.imagePickerContainer}>
                    {image ? (
                        <View>
                            <Image
                                source={{ uri: image }}
                                style={styles.imagePreview}
                            />
                            <TouchableOpacity
                                style={styles.changeImageButton}
                                onPress={pickImage}
                            >
                                <Text style={styles.changeImageText}>
                                    Change Image
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.imagePicker}
                            onPress={pickImage}
                        >
                            <Feather
                                name="plus-square"
                                size={50}
                                color={COLORS.gray}
                            />
                            <Text style={styles.imagePickerText}>
                                Tap to select an image
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Caption</Text>
                        <TextInput
                            style={styles.input}
                            value={caption}
                            onChangeText={setCaption}
                            placeholder="Write a caption..."
                            multiline
                            maxLength={2200}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.input}
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Add location"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Tags</Text>
                        <TextInput
                            style={styles.input}
                            value={tags}
                            onChangeText={setTags}
                            placeholder="Add tags separated by commas"
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Post"
                        onPress={handleCreatePost}
                        disabled={!image || loading}
                        loading={loading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        padding: SIZES.md,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.mediumGray,
    },
    headerTitle: {
        fontSize: FONTS.lg,
        fontWeight: "600",
        textAlign: "center",
        color: COLORS.black,
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
    imagePickerContainer: {
        alignItems: "center",
        marginVertical: SIZES.lg,
    },
    imagePicker: {
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
        borderStyle: "dashed",
        borderRadius: SIZES.borderRadiusSm,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePickerText: {
        marginTop: SIZES.md,
        color: COLORS.gray,
        fontSize: FONTS.sm,
    },
    imagePreview: {
        width: 300,
        height: 300,
        borderRadius: SIZES.borderRadiusSm,
    },
    changeImageButton: {
        marginTop: SIZES.md,
        alignSelf: "center",
    },
    changeImageText: {
        color: COLORS.primary,
        fontSize: FONTS.sm,
        fontWeight: "500",
    },
    formContainer: {
        padding: SIZES.md,
    },
    inputGroup: {
        marginBottom: SIZES.md,
    },
    label: {
        fontSize: FONTS.sm,
        fontWeight: "600",
        marginBottom: SIZES.xs,
        color: COLORS.black,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
        borderRadius: SIZES.borderRadiusSm,
        padding: SIZES.md,
        fontSize: FONTS.md,
        backgroundColor: COLORS.lightGray,
        color: COLORS.black,
    },
    buttonContainer: {
        paddingHorizontal: SIZES.md,
        marginBottom: SIZES.xl,
    },
});

export default CreatePostScreen;
