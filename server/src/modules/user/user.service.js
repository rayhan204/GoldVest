import * as repository from "./user.repository.js";
import bcrypt from "bcrypt";
import { updateProfileSchema, updatePasswordSchema } from "./user.validation.js";

export const getProfileService = async (userId) => {
  const user = await repository.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateProfileService = async (userId, payload) => {
  const data = updateProfileSchema.parse(payload);

  const user = await repository.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return repository.updateProfile(userId, data);
};

export const updatePasswordService = async (
  userId,
  payload
) => {
  const data = updatePasswordSchema.parse(payload);

  const user = await repository.findUserPasswordById(userId);

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(
    data.currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Password lama salah");
  }

  const isSamePassword = await bcrypt.compare(
    data.newPassword,
    user.password
  );

  if (isSamePassword) {
    throw new Error(
      "Password baru tidak boleh sama dengan password lama"
    );
  }

  const hashedPassword = await bcrypt.hash(
    data.newPassword,
    10
  );

  await repository.updatePassword(
    userId,
    hashedPassword
  );

  return {
    message: "Password berhasil diubah",
  };
};

export const updateAvatarService = async (
  userId,
  file
) => {

  if (!file) {
    throw new Error("Avatar wajib diupload");
  }

  const user =
    await repository.findUserById(userId);

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return repository.updateAvatar(
    userId,
    file.path
  );
};