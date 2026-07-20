import prisma from "../../config/database.js";
import bcrypt from "bcrypt";
import { loginSchema } from "./auth.validation.js";
import { generateAccessToken } from "../../utils/jwt.js";

export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email
        }
    });
};

export const createUser = async (data) => {
    return prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                phone: data.phone
            }
        });

        await tx.wallet.create({
            data: {
                userId: user.id,
                balance: 0
            }
        });

        await tx.portfolio.create({
            data: {
                userId: user.id,
                totalGram: 0,
                averageBuyPrice: 0
            }
        });
        return user;
    });
};

export const saveRefreshToken = async ({
  userId,
  token,
  expiresAt,
}) => {
  return prisma.refreshToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
};

export const findRefreshToken = async (
  token
) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
};

export const deleteRefreshToken = async (
  token
) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  });
};

export const deleteAllRefreshTokensByUserId =
  async (userId) => {
    return prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  };

