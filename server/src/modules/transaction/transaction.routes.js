import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { buyGoldController, sellGoldController, getTransactionHistoryController } from "./transaction.controller.js";

const router = Router();

/**
 * @swagger
 * /transactions/buy:
 *   post:
 *     summary: Buy Gold
 *     description: Membeli emas menggunakan saldo wallet.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gram
 *             properties:
 *               gram:
 *                 type: number
 *                 example: 1.5
 *     responses:
 *       201:
 *         description: Pembelian berhasil
 *       400:
 *         description: Saldo tidak mencukupi
 */
/**
 * @swagger
 * /transactions/sell:
 *   post:
 *     summary: Sell Gold
 *     description: Menjual emas dari portfolio user.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gram
 *             properties:
 *               gram:
 *                 type: number
 *                 example: 0.5
 *     responses:
 *       201:
 *         description: Penjualan berhasil
 *       400:
 *         description: Gram emas tidak mencukupi
 */
/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Transaction History
 *     description: Mengambil riwayat transaksi pembelian dan penjualan emas.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [BUY, SELL]
 *     responses:
 *       200:
 *         description: Berhasil mengambil riwayat transaksi
 */
// Buy Gold
router.post("/buy", authMiddleware, buyGoldController);

router.post("/sell", authMiddleware, sellGoldController);

router.get("/", authMiddleware, getTransactionHistoryController);

export default router;