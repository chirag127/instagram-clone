import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.31.232:5000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to inject the auth token
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth endpoints
export const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await api.post("/auth/login", userData);
    return response.data;
};

// User endpoints
export const getUserProfile = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const updateUserProfile = async (userData) => {
    const response = await api.put("/users/profile", userData);
    return response.data;
};

export const followUser = async (userId) => {
    const response = await api.put(`/users/${userId}/follow`);
    return response.data;
};

export const getFeed = async (page = 1, limit = 10) => {
    const response = await api.get(`/users/feed?page=${page}&limit=${limit}`);
    return response.data;
};

// Post endpoints
export const createPost = async (postData) => {
    const response = await api.post("/posts", postData);
    return response.data;
};

export const getAllPosts = async (page = 1, limit = 10) => {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
};

export const getUserPosts = async (userId) => {
    const response = await api.get(`/posts/user/${userId}`);
    return response.data;
};

export const likePost = async (postId) => {
    const response = await api.put(`/posts/${postId}/like`);
    return response.data;
};

export const commentOnPost = async (postId, text) => {
    const response = await api.post(`/posts/${postId}/comments`, { text });
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};

export default api;
