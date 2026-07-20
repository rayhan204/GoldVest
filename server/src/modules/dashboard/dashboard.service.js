import { getDashboardData } from "./dashboard.repository.js";

export const getDashboardService = async (userId) => {
  const { wallet, portfolio, goldPrice } =
    await getDashboardData(userId);

  if (!wallet)
    throw new Error("Wallet not found");

  if (!portfolio)
    throw new Error("Portfolio not found");

  if (!goldPrice)
    throw new Error("Gold price not found");

  const goldOwned = Number(portfolio.totalGram);

  const assetValue =
    goldOwned * Number(goldPrice.sellPrice);

  const totalWealth =
    Number(wallet.balance) + assetValue;

  return {
    walletBalance: Number(wallet.balance),
    goldOwned,
    buyPrice: Number(goldPrice.buyPrice),
    sellPrice: Number(goldPrice.sellPrice),
    assetValue,
    totalWealth,
  };
};