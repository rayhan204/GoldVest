import axiosInstance from "./axios";

export const getLatestGoldPrice = async () => {
    const response = await axiosInstance.get("/gold-prices/latest");
    return response.data;
};

export const getGoldPriceHistory = async () => {
    const response = await axiosInstance.get("/gold-prices/history");
    return response.data;
};