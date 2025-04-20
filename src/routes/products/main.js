import { Router } from "express";
import getProductsByCategory from "../../controllers/products/getProductsByCategory.js";
import getProductById from "../../controllers/products/getProductById.js";
import getAllProducts from "../../controllers/products/getAllProducts.js";
import getProductsByPrice from "../../controllers/products/getProductsByPrice.js";
import { deleteProduct } from "../../controllers/products/deleteProduct.js";
import { editProduct } from "../../controllers/products/editProduct.js";
import { createProduct } from "../../controllers/products/createNewProduct.js";
import multer from "multer";

export const productsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new products
productsRouter.post("/", upload.single("image"), createProduct);

// get all products
productsRouter.get("/", getAllProducts);

// get products by category
productsRouter.get("/category/:category", getProductsByCategory);

// get products by price range
productsRouter.get("/price", getProductsByPrice);

// get product by id
productsRouter.get("/:id", getProductById);

// Delete a product
productsRouter.delete("/:id", deleteProduct);

// Edit a product
productsRouter.put("/:id", editProduct);
