import axiosInstance from "./axios";

export const getPortofolio = async () => {
    const response = await axiosInstance.get("/portofolios");
    return response.data;
};