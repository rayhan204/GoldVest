import prisma from "../../config/database.js";

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateProfile = async (id, data) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      fullName: data.fullName,
      phone: data.phone,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      avatar: true,
      role: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const findUserPasswordById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      password: true,
    },
  });
};

export const updatePassword = async (id, password) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });
};

export const updateAvatar = async (
  id,
  avatar
) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      avatar,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      avatar: true,
    },
  });
};