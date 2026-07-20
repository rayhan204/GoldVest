import { Router } from "express";

import authMiddleware from "../../middlewares/auth.middleware.js";

import { getDashboard } from "./dashboard.controller.js";

const router = Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Dashboard Summary
 *     description: Mengambil ringkasan dashboard user.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil dashboard
 */

router.get(
  "/",
  authMiddleware,
  getDashboard
);

export default router;