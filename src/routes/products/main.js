import { Router } from "express";
import getProductsByCategory from "../../controllers/products/getProductsByCategory.js";
import getProductById from "../../controllers/products/getProductById.js";
import getAllProducts from "../../controllers/products/getAllProducts.js";
import getProductsByPrice from "../../controllers/products/getProductsByPrice.js";

export const productsRouter = Router();

// get all products
productsRouter.get("/", getAllProducts);

// get product by id
productsRouter.get("/:id", getProductById);

// get products by category
productsRouter.get("/category", getProductsByCategory);

// get products by price range
productsRouter.get("/price", getProductsByPrice);
