import { Router } from "express";
import { productsRouter } from "./products/main.js";
import { checkoutRoutes } from "./checkout/main.js";
import { authRoutes } from "./auth/main.js";

export const router = Router();

// Product routes
router.use("/products", productsRouter);

// Checkout routes
router.use("/checkout", checkoutRoutes);

// Customer routes

// User routes
router.use("/auth", authRoutes);
router.use("/notifications", notificationRoutes);


// Data processing routes (excel, json, pdf conversions)
