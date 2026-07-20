import prisma from "../../config/database.js";

export const getDashboardData = async (userId) => {
  const [wallet, portfolio, goldPrice] = await Promise.all([
    prisma.wallet.findUnique({
      where: { userId },
    }),

    prisma.portfolio.findUnique({
      where: { userId },
    }),

    prisma.goldPrice.findFirst({
      orderBy: {
        effectiveDate: "desc",
      },
    }),
  ]);

  return {
    wallet,
    portfolio,
    goldPrice,
  };
};