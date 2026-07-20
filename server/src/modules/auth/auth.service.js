import bcrypt from "bcrypt";

import { registerSchema, loginSchema } from "./auth.validation.js";
import * as authRepository from "./auth.repository.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";

export const register = async (payload) => {
  const data = registerSchema.parse(payload);
  const existingUser = await authRepository.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email sudah digunakan");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await authRepository.createUser({
    ...data,
    password: hashedPassword,
  });
};

export const login = async (payload) => {
  const data = loginSchema.parse(payload);

  const user = await authRepository.findUserByEmail(
    data.email
  );

  if (!user) {
    throw new Error("Email atau password salah");
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Email atau password salah");
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken =
    generateAccessToken(jwtPayload);

  const refreshToken =
    generateRefreshToken(jwtPayload);

  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + 7
  );

  await authRepository.saveRefreshToken({
    userId: user.id,
    token: refreshToken,
    expiresAt,
  });

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (
  refreshToken
) => {

  if (!refreshToken) {
    throw new Error(
      "Refresh token tidak ditemukan"
    );
  }

  const storedToken =
    await authRepository.findRefreshToken(
      refreshToken
    );

  if (!storedToken) {
    throw new Error(
      "Refresh token tidak valid"
    );
  }

  if (
    storedToken.expiresAt < new Date()
  ) {

    await authRepository.deleteRefreshToken(
      refreshToken
    );

    throw new Error(
      "Refresh token sudah kedaluwarsa"
    );
  }

  const payload =
    verifyRefreshToken(refreshToken);

  const accessToken =
    generateAccessToken({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });

  return {
    accessToken,
  };
};

export const logout = async (
  refreshToken
) => {

  if (!refreshToken) {
    throw new Error(
      "Refresh token wajib diisi"
    );
  }

  const token =
    await authRepository.findRefreshToken(
      refreshToken
    );

  if (!token) {
    throw new Error(
      "Refresh token tidak ditemukan"
    );
  }

  await authRepository.deleteRefreshToken(
    refreshToken
  );

  return {
    message: "Logout berhasil",
  };
};