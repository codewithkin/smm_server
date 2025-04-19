import { Router } from "express";
import { productsRouter } from "./products/main.js";
import { checkoutRoutes } from "./checkout/main.js";
import { authRoutes } from "./auth/main.js";
import { notificationRoutes } from "./notifications/main.js";
import { dataRoutes } from "./data/main.js";

export const router = Router();

// Product routes
router.use("/products", productsRouter);

// Checkout routes
router.use("/checkout", checkoutRoutes);

// Customer routes

// User routes
router.use("/auth", authRoutes);
router.use("/notifications", notificationRoutes);
router.use("/data", dataRoutes);

// Data processing routes (excel, json, pdf conversions)
