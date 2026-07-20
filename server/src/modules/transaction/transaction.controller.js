import {
  buyGoldService,
  sellGoldService,
  getTransactionHistoryService,
} from "./transaction.service.js";

export const buyGoldController = async (req, res) => {
  try {
    const result = await buyGoldService(
      req.user.id,
      req.body.gram
    );

    return res.status(200).json({
      success: true,
      message: "Gold purchased successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const sellGoldController = async (req, res) => {
  try {
    const result = await sellGoldService(
      req.user.id,
      req.body.gram
    );

    return res.status(200).json({
      success: true,
      message: "Gold sold successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTransactionHistoryController = async (
  req,
  res
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const type = req.query.type;

    const result =
      await getTransactionHistoryService(
        req.user.id,
        page,
        limit,
        type
      );

    return res.status(200).json({
      success: true,
      message: "Transaction history fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};