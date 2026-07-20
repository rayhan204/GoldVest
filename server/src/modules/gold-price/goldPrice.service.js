import * as repository from "./goldPrice.repository.js";
import { goldPriceSchema } from "./goldPrice.validation.js";

export const getLatestGoldPriceService = async () => {
  return repository.getLatestGoldPrice();
};

export const getGoldPriceHistoryService = async () => {
  return repository.getGoldPriceHistory();
};

export const createGoldPriceService = async (payload) => {
  const data = goldPriceSchema.parse(payload);
  return repository.createGoldPrice(data);
};

export const updateGoldPriceService = async (id, payload) => {
  const data = goldPriceSchema.parse(payload);
  const goldPrice = await repository.findGoldPriceById(id);

  if (!goldPrice) {
    throw new Error("Gold price not found");
  }

  return repository.updateGoldPrice(id, payload);
};

export const deleteGoldPriceService = async (id) => {
  const goldPrice = await repository.findGoldPriceById(id);

  if (!goldPrice) {
    throw new Error("Gold price not found");
  }

  await repository.deleteGoldPrice(id);

  return {
    message: "Gold price deleted successfully",
  };
};