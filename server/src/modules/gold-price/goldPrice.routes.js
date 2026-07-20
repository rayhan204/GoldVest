import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";
import { adminMiddleware } from "../../middlewares/admin.middleware.js";

import {
  getLatestGoldPriceController,
  getGoldPriceHistoryController,
  createGoldPriceController,
  updateGoldPriceController,
  deleteGoldPriceController,
} from "./goldPrice.controller.js";

const router = Router();
/**
 * @swagger
 * /gold-prices/latest:
 *   get:
 *     summary: Latest Gold Price
 *     description: Mengambil harga emas terbaru.
 *     tags:
 *       - Gold Price
 *     responses:
 *       200:
 *         description: Berhasil mengambil harga emas terbaru
 */
/**
 * @swagger
 * /gold-prices/history:
 *   get:
 *     summary: Gold Price History
 *     description: Mengambil riwayat harga emas.
 *     tags:
 *       - Gold Price
 *     responses:
 *       200:
 *         description: Berhasil mengambil riwayat harga emas
 */
/**
 * @swagger
 * /gold-prices:
 *   post:
 *     summary: Create Gold Price
 *     description: Menambahkan harga emas baru (Admin).
 *     tags:
 *       - Gold Price
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyPrice
 *               - sellPrice
 *             properties:
 *               buyPrice:
 *                 type: number
 *                 example: 1950000
 *               sellPrice:
 *                 type: number
 *                 example: 1900000
 *     responses:
 *       201:
 *         description: Harga emas berhasil ditambahkan
 */
/**
 * @swagger
 * /gold-prices/{id}:
 *   put:
 *     summary: Update Gold Price
 *     description: Mengubah harga emas berdasarkan ID (Admin).
 *     tags:
 *       - Gold Price
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyPrice:
 *                 type: number
 *                 example: 1950000
 *               sellPrice:
 *                 type: number
 *                 example: 1900000
 *     responses:
 *       200:
 *         description: Harga emas berhasil diperbarui
 */
/**
 * @swagger
 * /gold-prices/{id}:
 *   delete:
 *     summary: Delete Gold Price
 *     description: Menghapus data harga emas berdasarkan ID (Admin).
 *     tags:
 *       - Gold Price
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: uuid
 *     responses:
 *       200:
 *         description: Harga emas berhasil dihapus
 */
// USER & ADMIN
router.get("/latest", authMiddleware, getLatestGoldPriceController);
router.get("/history", authMiddleware, getGoldPriceHistoryController);

// ADMIN ONLY
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createGoldPriceController
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateGoldPriceController
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteGoldPriceController
);

export default router;