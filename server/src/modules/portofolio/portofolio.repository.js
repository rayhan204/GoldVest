import prisma from "../../config/database.js";

export const getPortofolioByUserId = async (userId) => {
  return prisma.portfolio.findUnique({
    where: {
      userId,
    },
  });
};

export const getLatestGoldPrice = async () => {
  return prisma.goldPrice.findFirst({
    orderBy: {
      effectiveDate: "desc",
    },
  });
};