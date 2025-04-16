import { Router } from "express";
import { productsRouter } from "./products/main";

export const router = Router();

// Product routes
router.get("/products", productsRouter);

// Checkout routes

// Customer routes

// User routes

// Data processing routes (excel, json, pdf conversions)