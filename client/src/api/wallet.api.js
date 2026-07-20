import axiosInstance from "./axios";

export const getWallet = async () => {
    const response = await axiosInstance.get("/wallet");
    return response.data;
};

export const topUp = async (data) => {
    const response = await axiosInstance.post("/wallet/top-up", data);
    return response.data;
};

export const withdraw = async (data) => {
    const response = await axiosInstance.post("/wallet/withdraw", data);
    return response.data;
};

export const getWalletHistory = async () => {
    const response = await axiosInstance.get("/wallet/history");
    return response.data;
};