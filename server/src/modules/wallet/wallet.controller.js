import {
  getWalletService,
  topUpService,
  withdrawService,
  walletHistoryService,
} from "./wallet.service.js";

export const getWallet = async (req, res) => {
  try {
    const result = await getWalletService(req.user.id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const topUp = async (req, res) => {
  try {
    const result = await topUpService(
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Top up berhasil",
      data: {
        balance: result.balance,
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const withdraw = async (req, res) => {
  try {
    const result = await withdrawService(
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Withdraw berhasil",
      data: {
        balance: result.balance,
      }
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const walletHistory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await walletHistoryService(
      req.user.id,
      page,
      limit
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};