import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

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
                    color={type === "primary" ? COLORS.white : COLORS.primary}
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
        borderRadius: SIZES.borderRadiusSm,
        paddingVertical: SIZES.md,
        paddingHorizontal: SIZES.lg,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    button_primary: {
        backgroundColor: COLORS.primary,
    },
    button_secondary: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    button_link: {
        backgroundColor: "transparent",
        paddingVertical: SIZES.sm,
    },
    buttonDisabled: {
        backgroundColor: COLORS.mediumGray,
        borderColor: COLORS.mediumGray,
        opacity: 0.7,
    },
    text: {
        fontSize: FONTS.md,
        fontWeight: "600",
        fontFamily: FONTS.medium,
    },
    text_primary: {
        color: COLORS.white,
    },
    text_secondary: {
        color: COLORS.primary,
    },
    text_link: {
        color: COLORS.primary,
    },
    textDisabled: {
        color: COLORS.white,
    },
});

export default Button;
