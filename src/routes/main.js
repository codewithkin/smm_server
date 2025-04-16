import { Router } from "express";
import { productsRouter } from "./products/main";

export const router = Router();

// Product routes
router.get("/products", productsRouter);

// User routes

// Data processing routes (excel, json, pdf conversions)