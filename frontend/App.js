import React from "react";
import { StatusBar } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { COLORS } from "./src/constants/theme";

export default function App() {
    return (
        <AuthProvider>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <AppNavigator />
        </AuthProvider>
    );
}
