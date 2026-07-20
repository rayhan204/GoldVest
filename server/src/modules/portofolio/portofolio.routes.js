import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";

import { getPortofolioController } from "./portofolio.controller.js";

const router = Router();

/**
 * @swagger
 * /portofolios:
 *   get:
 *     summary: Get Portofolios
 *     description: Mengambil ringkasan portofolio emas user.
 *     tags:
 *       - Portofolio
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil portofolio
 */
router.get("/", authMiddleware, getPortofolioController);

export default router;