import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Use mock API for development
import {
    login as loginApi,
    register as registerApi,
} from "../services/mockApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on app load
        const checkLoggedIn = async () => {
            try {
                const userData = await AsyncStorage.getItem("user");
                const token = await AsyncStorage.getItem("token");

                if (userData && token) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Error retrieving auth data:", error);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await loginApi({ email, password });

            await AsyncStorage.setItem("token", response.token);
            await AsyncStorage.setItem("user", JSON.stringify(response.user));

            setUser(response.user);
            return response.user;
        } catch (error) {
            setError(error.message || "Login failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        try {
            setLoading(true);
            setError(null);

            const response = await registerApi({ username, email, password });

            await AsyncStorage.setItem("token", response.token);
            await AsyncStorage.setItem("user", JSON.stringify(response.user));

            setUser(response.user);
            return response.user;
        } catch (error) {
            setError(error.message || "Registration failed");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
