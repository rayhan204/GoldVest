import prisma from "../../config/database.js";

export const findWalletByUserId = async (userId) => {
  return prisma.wallet.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
      balance: true,
      updatedAt: true,
    },
  });
};

export const updateBalance = async (walletId, balance) => {
  return prisma.wallet.update({
    where: {
      id: walletId,
    },
    data: {
      balance,
    },
  });
};

export const createWalletHistory = async ({
  walletId,
  type,
  amount,
  balance,
}) => {
  return prisma.walletTransaction.create({
    data: {
      walletId,
      type,
      amount,
      balance,
    },
  });
};

export const topUpWallet = async ({
  walletId,
  amount,
  newBalance,
}) => {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: newBalance,
      },
    });

    await tx.walletTransaction.create({
      data: {
        walletId,
        type: "TOPUP",
        amount,
        balance: newBalance,
      },
    });

    return wallet;
  });
};

export const withdrawWallet = async ({
  walletId,
  amount,
  newBalance,
}) => {
  return prisma.$transaction(async (tx) => {
    const wallet = await tx.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        balance: newBalance,
      },
    });

    await tx.walletTransaction.create({
      data: {
        walletId,
        type: "WITHDRAW",
        amount,
        balance: newBalance,
      },
    });

    return wallet;
  });
};

export const getWalletHistory = async (
  walletId,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const [transactions, total] = await prisma.$transaction([
    prisma.walletTransaction.findMany({
      where: {
        walletId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),

    prisma.walletTransaction.count({
      where: {
        walletId,
      },
    }),
  ]);

  return {
    transactions,
    total,
  };
};