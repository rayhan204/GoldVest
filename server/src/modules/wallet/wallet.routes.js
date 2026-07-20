import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";

import {
  getWallet,
  topUp,
  withdraw,
  walletHistory,
} from "./wallet.controller.js";

const router = Router();

/**
 * @swagger
 * /wallet:
 *   get:
 *     summary: Get Wallet Balance
 *     description: Mengambil informasi saldo wallet user yang sedang login.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil data wallet
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /wallet/top-up:
 *   post:
 *     summary: Top Up Wallet
 *     description: Menambahkan saldo ke wallet user.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100000
 *     responses:
 *       200:
 *         description: Top up berhasil
 *       400:
 *         description: Nominal tidak valid
 */
/**
 * @swagger
 * /wallet/withdraw:
 *   post:
 *     summary: Withdraw Wallet
 *     description: Menarik saldo dari wallet user.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50000
 *     responses:
 *       200:
 *         description: Withdraw berhasil
 *       400:
 *         description: Saldo tidak mencukupi
 */
/**
 * @swagger
 * /wallet/history:
 *   get:
 *     summary: Wallet History
 *     description: Mengambil riwayat top up dan withdraw wallet.
 *     tags:
 *       - Wallet
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil riwayat wallet
 */
router.get("/", authMiddleware, getWallet);

router.post(
  "/top-up",
  authMiddleware,
  topUp
);

router.post(
  "/withdraw",
  authMiddleware,
  withdraw
);

router.get(
  "/history",
  authMiddleware,
  walletHistory
);

export default router;