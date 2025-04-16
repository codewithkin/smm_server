import { Router } from "express";

export const productsRouter = Router();

// get all products
productsRouter.get("/", getAllProducts);

// get product by id
productsRouter.get("/:id", getProductById);

// get products by category
productsRouter.get("/category", getProductsByCategory);

// get products by price range
productsRouter.get("/price", getProductsByCategory);