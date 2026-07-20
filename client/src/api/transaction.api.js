import axiosInstance from "./axios";

export const buyGold = async (data) => {
    const response = await axiosInstance.post("/transactions/buy", data);
    return response.data;
};

export const sellGold = async (data) => {
    const response = await axiosInstance.post("/transactions/sell", data);
    return response.data;
};

export const getTransactionHistory = async (params) => {
    const response = await axiosInstance.get("/transactions", {
        params,
    });

    return response.data;
};