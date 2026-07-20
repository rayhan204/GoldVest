import prisma from "../../config/database.js";

/**
 * Get Wallet
 */
export const getWalletByUserId = async (userId) => {
  return prisma.wallet.findUnique({
    where: {
      userId,
    },
  });
};

/**
 * Get Portfolio
 */
export const getPortfolioByUserId = async (userId) => {
  return prisma.portfolio.findUnique({
    where: {
      userId,
    },
  });
};

/**
 * Get Latest Gold Price
 */
export const getLatestGoldPrice = async () => {
  return prisma.goldPrice.findFirst({
    orderBy: {
      effectiveDate: "desc",
    },
  });
};

/**
 * BUY GOLD
 */
export const executeBuyGoldTransaction = async ({
  userId,
  gram,
  totalPrice,
  buyPrice,
  goldPriceId,
  averageBuyPrice,
}) => {
  return prisma.$transaction(async (tx) => {

    // Wallet
    const wallet = await tx.wallet.update({
      where: {
        userId,
      },
      data: {
        balance: {
          decrement: totalPrice,
        },
      },
    });

    // Portfolio
    const portfolio = await tx.portfolio.update({
      where: {
        userId,
      },
      data: {
        totalGram: {
          increment: gram,
        },
        averageBuyPrice,
      },
    });

    // Transaction
    const transaction = await tx.transaction.create({
      data: {
        userId,
        goldPriceId,
        type: "BUY",
        gram,
        pricePerGram: buyPrice,
        totalPrice,
        status: "SUCCESS",
      },
    });

    return {
      wallet,
      portfolio,
      transaction,
    };
  });
};

/**
 * SELL GOLD
 */
export const executeSellGoldTransaction = async ({
  userId,
  gram,
  totalPrice,
  sellPrice,
  goldPriceId,
  averageBuyPrice,
}) => {
  return prisma.$transaction(async (tx) => {

    // Wallet
    const wallet = await tx.wallet.update({
      where: {
        userId,
      },
      data: {
        balance: {
          increment: totalPrice,
        },
      },
    });

    // Portfolio
    const portfolio = await tx.portfolio.update({
      where: {
        userId,
      },
      data: {
        totalGram: {
          decrement: gram,
        },
        averageBuyPrice,
      },
    });

    // Transaction
    const transaction = await tx.transaction.create({
      data: {
        userId,
        goldPriceId,
        type: "SELL",
        gram,
        pricePerGram: sellPrice,
        totalPrice,
        status: "SUCCESS",
      },
    });

    return {
      wallet,
      portfolio,
      transaction,
    };
  });
};

/**
 * GET TRANSACTION HISTORY
 */
export const getTransactionHistory = async ({
  userId,
  page = 1,
  limit = 10,
  type,
}) => {
  const skip = (page - 1) * limit;

  const where = {
    userId,
    ...(type && { type }),
  };

  const [transactions, totalData] = await prisma.$transaction([
    prisma.transaction.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
      select: {
          id: true,
          type: true,
          gram: true,
          pricePerGram: true,
          totalPrice: true,
          status: true,
          createdAt: true,

          goldPrice: {
              select: {
                  buyPrice: true,
                  sellPrice: true,
                  effectiveDate: true,
              },
          },
      }
    }),

    prisma.transaction.count({
      where,
    }),
  ]);

  return {
    transactions,
    totalData,
  };
};