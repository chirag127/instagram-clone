import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const FormInput = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    autoCapitalize = "none",
    keyboardType = "default",
    error = null,
    label = null,
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.inputError]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                placeholderTextColor={COLORS.gray}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SIZES.md,
        width: "100%",
    },
    label: {
        marginBottom: SIZES.xs,
        fontSize: FONTS.sm,
        fontWeight: "500",
        color: COLORS.darkGray,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.mediumGray,
        borderRadius: SIZES.borderRadiusSm,
        padding: SIZES.md,
        fontSize: FONTS.md,
        backgroundColor: COLORS.lightGray,
        height: 44, // Instagram's input height
    },
    inputError: {
        borderColor: COLORS.error,
    },
    errorText: {
        color: COLORS.error,
        fontSize: FONTS.xs,
        marginTop: SIZES.xs,
    },
});

export default FormInput;
