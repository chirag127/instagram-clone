import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

const Button = ({
    title,
    onPress,
    type = "primary",
    disabled = false,
    loading = false,
    style = {},
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                styles[`button_${type}`],
                disabled && styles.buttonDisabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    color={type === "primary" ? "#fff" : "#3897f0"}
                />
            ) : (
                <Text
                    style={[
                        styles.text,
                        styles[`text_${type}`],
                        disabled && styles.textDisabled,
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    button_primary: {
        backgroundColor: "#3897f0",
    },
    button_secondary: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#3897f0",
    },
    button_link: {
        backgroundColor: "transparent",
        paddingVertical: 8,
    },
    buttonDisabled: {
        backgroundColor: "#a1c8f7",
        borderColor: "#a1c8f7",
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
    },
    text_primary: {
        color: "#fff",
    },
    text_secondary: {
        color: "#3897f0",
    },
    text_link: {
        color: "#3897f0",
    },
    textDisabled: {
        color: "#fff",
    },
});

export default Button;
