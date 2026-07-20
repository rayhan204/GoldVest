import {
  getWalletByUserId,
  getPortfolioByUserId,
  getLatestGoldPrice,
  executeBuyGoldTransaction,
  executeSellGoldTransaction,
  getTransactionHistory,
} from "./transaction.repository.js";

/**
 * Mengambil data yang dibutuhkan untuk transaksi
 */
const getTradingContext = async (userId) => {
  const wallet = await getWalletByUserId(userId);
  const portfolio = await getPortfolioByUserId(userId);
  const goldPrice = await getLatestGoldPrice();

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  if (!goldPrice) {
    throw new Error("Gold price not found");
  }

  return {
    wallet,
    portfolio,
    goldPrice,
  };
};

/**
 * Menghitung Average Buy Price setelah pembelian
 */
const calculateAverageBuyPrice = (
  portfolio,
  buyGram,
  buyPrice
) => {
  const oldGram = Number(portfolio.totalGram);
  const oldAverage = Number(portfolio.averageBuyPrice);

  const oldInvestment = oldGram * oldAverage;
  const newInvestment = buyGram * buyPrice;

  const newTotalGram = oldGram + buyGram;

  if (newTotalGram === 0) {
    return 0;
  }

  return (oldInvestment + newInvestment) / newTotalGram;
};

/**
 * BUY GOLD
 */
export const buyGoldService = async (userId, gram) => {
  const { wallet, portfolio, goldPrice } =
    await getTradingContext(userId);

  const buyPrice = Number(goldPrice.buyPrice);

  const totalPrice = buyPrice * gram;

  if (Number(wallet.balance) < totalPrice) {
    throw new Error("Insufficient balance");
  }

  const averageBuyPrice =
    calculateAverageBuyPrice(
      portfolio,
      gram,
      buyPrice
    );

  const result =
    await executeBuyGoldTransaction({
      userId,
      gram,
      totalPrice,
      buyPrice,
      goldPriceId: goldPrice.id,
      averageBuyPrice,
    });

  return {
    gram,
    buyPrice,
    totalPrice,
    averageBuyPrice,
    remainingBalance: Number(result.wallet.balance),
    totalGold: Number(result.portfolio.totalGram),
  };
};

/**
 * SELL GOLD
 */
export const sellGoldService = async (
  userId,
  gram
) => {
  const { wallet, portfolio, goldPrice } =
    await getTradingContext(userId);

  const ownedGold = Number(portfolio.totalGram);

  if (ownedGold < gram) {
    throw new Error("Insufficient gold balance");
  }

  const sellPrice = Number(goldPrice.sellPrice);

  const totalPrice = sellPrice * gram;

  const remainingGold = ownedGold - gram;

  const averageBuyPrice =
    remainingGold === 0
      ? 0
      : Number(portfolio.averageBuyPrice);

  const result =
    await executeSellGoldTransaction({
      userId,
      gram,
      totalPrice,
      sellPrice,
      goldPriceId: goldPrice.id,
      averageBuyPrice,
    });

  return {
    gram,
    sellPrice,
    totalPrice,
    averageBuyPrice,
    remainingBalance: Number(result.wallet.balance),
    remainingGold: Number(result.portfolio.totalGram),
  };
};

/**
 * GET TRANSACTION HISTORY
 */
export const getTransactionHistoryService = async (
  userId,
  page,
  limit,
  type
) => {

  const {
    transactions,
    totalData,
  } = await getTransactionHistory({
    userId,
    page,
    limit,
    type,
  });

  return {
    page,
    limit,
    totalData,
    totalPage: Math.ceil(totalData / limit),
    transactions,
  };
};