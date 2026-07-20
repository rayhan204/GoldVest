import * as service from "./goldPrice.service.js";

export const getLatestGoldPriceController = async (req, res) => {
  try {
    const result = await service.getLatestGoldPriceService();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getGoldPriceHistoryController = async (req, res) => {
  try {
    const result = await service.getGoldPriceHistoryService();

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const createGoldPriceController = async (req, res) => {
  try {
    const result = await service.createGoldPriceService(req.body);

    res.status(201).json({
      success: true,
      message: "Gold price created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateGoldPriceController = async (req, res) => {
  try {
    const result = await service.updateGoldPriceService(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Gold price updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteGoldPriceController = async (req, res) => {
  try {
    const result = await service.deleteGoldPriceService(req.params.id);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};