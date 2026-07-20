import express from "express";
import cors from "cors";
import path from "path";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

import authRoutes from "./modules/auth/auth.routes.js";
import walletRoutes from "./modules/wallet/wallet.routes.js";
import goldPriceRoutes from "./modules/gold-price/goldPrice.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import transactionRoutes from "./modules/transaction/transaction.routes.js";
import portofolioRoutes from "./modules/portofolio/portofolio.routes.js";
import userRoutes from "./modules/user/user.routes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/gold-prices", goldPriceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/portofolios", portofolioRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec)
);

export default app;