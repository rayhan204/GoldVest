import { getDashboardService } from "./dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await getDashboardService(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};