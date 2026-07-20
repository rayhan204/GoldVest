import axiosInstance from "./axios";

export const getProfile = async () => {
    const response = await axiosInstance.get("/users/me");
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await axiosInstance.put("/users/profile", data);
    return response.data;
};

export const updatePassword = async (data) => {
    const response = await axiosInstance.put("/users/password", data);
    return response.data;
};

export const updateAvatar = async (data) => {
    const response = await axiosInstance.put("/users/avatar", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
