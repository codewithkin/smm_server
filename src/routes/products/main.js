import { Router } from "express";
import getProductsByCategory from "../../controllers/products/getProductsByCategory.js";
import getProductById from "../../controllers/products/getProductById.js";
import getAllProducts from "../../controllers/products/getAllProducts.js";
import getProductsByPrice from "../../controllers/products/getProductsByPrice.js";
import createNewProduct from "../../controllers/products/createNewProduct.js";

export const productsRouter = Router();

// Create a new products
productsRouter.post("/new", createNewProduct);

// get all products
productsRouter.get("/", getAllProducts);

// get products by category
productsRouter.get("/category/:category", getProductsByCategory);

// get products by price range
productsRouter.get("/price", getProductsByPrice);

// get product by id
productsRouter.get("/:id", getProductById);
