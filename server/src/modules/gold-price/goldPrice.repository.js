import prisma from "../../config/database.js";

export const getLatestGoldPrice = async () => {
  return prisma.goldPrice.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getGoldPriceHistory = async () => {
  return prisma.goldPrice.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createGoldPrice = async (data) => {
  return prisma.goldPrice.create({
    data,
  });
};

export const updateGoldPrice = async (id, data) => {
  return prisma.goldPrice.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteGoldPrice = async (id) => {
  return prisma.goldPrice.delete({
    where: {
      id,
    },
  });
};

export const findGoldPriceById = async (id) => {
  return prisma.goldPrice.findUnique({
    where: {
      id,
    },
  });
};