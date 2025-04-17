import { Router } from "express";
import { productsRouter } from "./products/main.js";
import { checkoutRoutes } from "./checkout/main.js";

export const router = Router();

// Product routes
router.use("/products", productsRouter);

// Checkout routes
router.use("/checkout", checkoutRoutes);

// Customer routes

// User routes

// Data processing routes (excel, json, pdf conversions)
