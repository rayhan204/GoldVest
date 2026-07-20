import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/upload.middleware.js";
import {
  getProfileController,
  updateProfileController,
  updatePasswordController,
  updateAvatarController
} from "./user.controller.js";

const router = Router();
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get User Profile
 *     description: Mengambil informasi profil user yang sedang login.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil profile
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update Profile
 *     description: Mengubah nama lengkap user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Rayhan Ghozali
 *     responses:
 *       200:
 *         description: Profile berhasil diperbarui
 */
/**
 * @swagger
 * /users/password:
 *   put:
 *     summary: Change Password
 *     description: Mengubah password user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: rayhan123
 *               newPassword:
 *                 type: string
 *                 example: rayhan456
 *     responses:
 *       200:
 *         description: Password berhasil diubah
 */
/**
 * @swagger
 * /users/avatar:
 *   put:
 *     summary: Upload Avatar
 *     description: Upload foto profil user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar berhasil diperbarui
 */
router.get(
  "/me",
  authMiddleware,
  getProfileController
);

router.put(
  "/profile",
  authMiddleware,
  updateProfileController
);

router.put(
  "/password",
  authMiddleware,
  updatePasswordController
);

router.put(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  updateAvatarController
);

export default router;