import * as repository from "./portofolio.repository.js";

export const getPortofolioService = async (userId) => {
  const portofolio = await repository.getPortofolioByUserId(userId);

  if (!portofolio) {
    throw new Error("Portofolio not found");
  }

  const goldPrice = await repository.getLatestGoldPrice();

  const totalGram = Number(portofolio.totalGram);
  const averageBuyPrice = Number(portofolio.averageBuyPrice);

  const currentSellPrice = Number(goldPrice.sellPrice);
  const currentBuyPrice = Number(goldPrice.buyPrice);

  const currentValue = totalGram * currentSellPrice;

  const totalInvestment = totalGram * averageBuyPrice;

  const profitLoss = currentValue - totalInvestment;

  const profitLossPercentage =
    totalInvestment === 0
      ? 0
      : Number(((profitLoss / totalInvestment) * 100).toFixed(2));

  return {
    totalGram,
    averageBuyPrice,
    currentBuyPrice,
    currentSellPrice,
    currentValue,
    totalInvestment,
    profitLoss,
    profitLossPercentage,
  };
};