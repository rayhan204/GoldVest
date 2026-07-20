import { walletSchema } from "./wallet.validation.js";
import * as repository from "./wallet.repository.js";
import { Prisma } from "@prisma/client";

export const getWalletService = async (userId) => {
  const wallet = await repository.findWalletByUserId(userId);

  if (!wallet) {
    throw new Error("Wallet tidak ditemukan");
  }

  return wallet;
};

export const topUpService = async (userId, payload) => {
  const { amount } = walletSchema.parse(payload);

  const wallet = await repository.findWalletByUserId(userId);

  if (!wallet) {
    throw new Error("Wallet tidak ditemukan");
  }

  const newBalance =
    new Prisma.Decimal(wallet.balance)
        .plus(new Prisma.Decimal(amount));

  return repository.topUpWallet({
    walletId: wallet.id,
    amount,
    newBalance,
  });
};

export const withdrawService = async (userId, payload) => {
  const { amount } = walletSchema.parse(payload);

  const wallet = await repository.findWalletByUserId(userId);

  if (!wallet) {
    throw new Error("Wallet tidak ditemukan");
  }

  if (Number(wallet.balance) < Number(amount)) {
    throw new Error("Saldo tidak mencukupi");
  }

  const newBalance =
    new Prisma.Decimal(wallet.balance)
        .minus(new Prisma.Decimal(amount));

  return repository.withdrawWallet({
    walletId: wallet.id,
    amount,
    newBalance,
  });
};

export const walletHistoryService = async (
  userId,
  page = 1,
  limit = 10
) => {
  const wallet = await repository.findWalletByUserId(userId);

  if (!wallet) {
    throw new Error("Wallet tidak ditemukan");
  }

  return repository.getWalletHistory(
    wallet.id,
    Number(page),
    Number(limit)
  );
};