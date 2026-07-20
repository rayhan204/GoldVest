import {
  getProfileService,
  updateProfileService,
  updatePasswordService,
  updateAvatarService,
} from "./user.service.js";

export const getProfileController = async (req, res) => {
  try {
    const result = await getProfileService(req.user.id);

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

export const updateProfileController = async (req, res) => {
  try {
    const result = await updateProfileService(
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePasswordController = async (
  req,
  res
) => {
  try {
    const result = await updatePasswordService(
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAvatarController = async (
  req,
  res
) => {

  try {

    const result =
      await updateAvatarService(
        req.user.id,
        req.file
      );

    return res.status(200).json({
      success: true,
      message: "Avatar berhasil diubah",
      data: result,
    });

  } catch (err) {

    return res.status(400).json({
      success: false,
      message: err.message,
    });

  }

};