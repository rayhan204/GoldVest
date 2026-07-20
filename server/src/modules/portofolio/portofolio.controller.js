import { getPortofolioService } from "./portofolio.service.js";

export const getPortofolioController = async (req, res) => {
  try {
    const result = await getPortofolioService(req.user.id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};