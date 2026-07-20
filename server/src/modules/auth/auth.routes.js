import { Router } from "express";

import {
  register,
  login,
  refreshToken,
  logout,
} from "./auth.controller.js";

const router = Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: rayhan@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register User
 *     description: Membuat akun baru beserta Wallet dan Portfolio secara otomatis.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Rayhan Ghozali
 *               email:
 *                 type: string
 *                 example: rayhan@gmail.com
 *               password:
 *                 type: string
 *                 example: rayhan123
 *     responses:
 *       201:
 *         description: Register berhasil
 *       400:
 *         description: Email sudah digunakan
 */
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh Access Token
 *     description: Membuat Access Token baru menggunakan Refresh Token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Access Token berhasil diperbarui
 */
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout User
 *     description: Menghapus Refresh Token dari database.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logout berhasil
 */
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;