import axiosInstance from "./axios";

export const getLatestGoldPrice = async () => {
  const response = await axiosInstance.get("/gold-prices/latest");
  return response.data;
};

export const getGoldPriceHistory = async () => {
  const response = await axiosInstance.get("/gold-prices/history");
  return response.data;
};

export const createGoldPrice = async (data) => {
  const response = await axiosInstance.post("/gold-prices", data);
  return response.data;
};

export const updateGoldPrice = async ({ id, data }) => {
  const response = await axiosInstance.put(`/gold-prices/${id}`, data);
  return response.data;
};

export const deleteGoldPrice = async (id) => {
  const response = await axiosInstance.delete(`/gold-prices/${id}`);
  return response.data;
};
