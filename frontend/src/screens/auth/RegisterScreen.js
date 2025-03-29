import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    SafeAreaView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { register, loading, error } = useContext(AuthContext);

    const validate = () => {
        let tempErrors = {};
        if (!username) tempErrors.username = "Username is required";
        if (!email) tempErrors.email = "Email is required";
        if (!password) tempErrors.password = "Password is required";
        if (password.length < 6)
            tempErrors.password = "Password must be at least 6 characters";
        if (password !== confirmPassword)
            tempErrors.confirmPassword = "Passwords do not match";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleRegister = async () => {
        if (validate()) {
            try {
                await register(username, email, password);
            } catch (error) {
                // Error handling is done in the AuthContext
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardContainer}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../../../assets/instagram-logo.svg")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.headerText}>
                        Sign up to see photos and videos from your friends.
                    </Text>

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <FormInput
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        error={errors.username}
                    />

                    <FormInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        error={errors.email}
                    />

                    <FormInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        error={errors.password}
                    />

                    <FormInput
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry
                        error={errors.confirmPassword}
                    />

                    <Button
                        title="Sign Up"
                        onPress={handleRegister}
                        loading={loading}
                        disabled={loading}
                    />

                    <Text style={styles.termsText}>
                        By signing up, you agree to our Terms, Data Policy and
                        Cookies Policy.
                    </Text>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={styles.loginText}>Log in</Text>
                        </TouchableOpacity>
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
    keyboardContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 80,
    },
    headerText: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 16,
        color: "#8e8e8e",
        paddingHorizontal: 40,
    },
    errorText: {
        color: "red",
        marginBottom: 15,
        textAlign: "center",
    },
    termsText: {
        textAlign: "center",
        marginTop: 20,
        color: "#8e8e8e",
        fontSize: 12,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
    },
    footerText: {
        color: "#999",
        marginRight: 5,
    },
    loginText: {
        color: "#3897f0",
        fontWeight: "bold",
    },
});

export default RegisterScreen;
