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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "../services/api";
import Button from "../components/Button";

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

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled) {
                setImage(result.uri);
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
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Create New Post</Text>
                </View>

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
                            <Ionicons
                                name="image-outline"
                                size={50}
                                color="#8e8e8e"
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
        backgroundColor: "#fff",
    },
    header: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#efefef",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
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
    imagePickerContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    imagePicker: {
        width: 300,
        height: 300,
        borderWidth: 1,
        borderColor: "#dbdbdb",
        borderStyle: "dashed",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePickerText: {
        marginTop: 10,
        color: "#8e8e8e",
    },
    imagePreview: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    changeImageButton: {
        marginTop: 10,
        alignSelf: "center",
    },
    changeImageText: {
        color: "#3897f0",
    },
    formContainer: {
        padding: 15,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#dbdbdb",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#fafafa",
    },
    buttonContainer: {
        paddingHorizontal: 15,
        marginBottom: 30,
    },
});

export default CreatePostScreen;
