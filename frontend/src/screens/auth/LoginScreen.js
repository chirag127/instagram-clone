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
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login, loading, error } = useContext(AuthContext);

    const validate = () => {
        let tempErrors = {};
        if (!email) tempErrors.email = "Email is required";
        if (!password) tempErrors.password = "Password is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = async () => {
        if (validate()) {
            try {
                await login(email, password);
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
                            source={require("../../../assets/instagram-logo-text.svg")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    {error && <Text style={styles.errorText}>{error}</Text>}

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

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>

                    <Button
                        title="Log In"
                        onPress={handleLogin}
                        loading={loading}
                        disabled={loading}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={styles.signupText}>Sign up</Text>
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
        backgroundColor: COLORS.white,
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: SIZES.xl,
        paddingTop: 0,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: SIZES.xxl,
        marginTop: SIZES.xxl,
    },
    logo: {
        width: 200,
        height: 70,
    },
    errorText: {
        color: COLORS.error,
        marginBottom: SIZES.md,
        textAlign: "center",
        fontSize: FONTS.sm,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: SIZES.lg,
        marginTop: SIZES.sm,
    },
    forgotPasswordText: {
        color: COLORS.primary,
        fontSize: FONTS.sm,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: SIZES.xxl,
        borderTopWidth: 1,
        borderTopColor: COLORS.mediumGray,
        paddingTop: SIZES.lg,
    },
    footerText: {
        color: COLORS.gray,
        marginRight: SIZES.xs,
        fontSize: FONTS.sm,
    },
    signupText: {
        color: COLORS.primary,
        fontWeight: "600",
        fontSize: FONTS.sm,
    },
});

export default LoginScreen;
