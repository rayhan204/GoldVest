import axiosInstance from "./axios";

export const login = async (data) => {
    console.log("REQUEST:", data);
    const response = await axiosInstance.post("/auth/login", data);
    console.log("RESPONSE:", response.data);
    return response.data;
};

export const register = async (data) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
};

export const logout = async (refreshToken) => {
    const response = await axiosInstance.post("/auth/logout", {
        refreshToken,
    });

    return response.data;
};

export const refreshToken = async (refreshToken) => {
    const response = await axiosInstance.post("/auth/refresh", {
        refreshToken,
    });

    return response.data;
};