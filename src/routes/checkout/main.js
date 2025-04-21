import { Router } from "express";
import createCheckout from "../../controllers/checkout/createCheckout.js";
import { getCheckoutById } from "../../controllers/checkout/getCheckoutById.js";
import { downloadReceipt } from "../../controllers/checkout/downloadReceipt.js";
import { getAllReceipts } from "../../controllers/checkout/getCheckouts.js";

export const checkoutRoutes = Router();

// Create a new checkout
checkoutRoutes.post("/", createCheckout);

// Get all checkouts
checkoutRoutes.get("/", getAllReceipts);

checkoutRoutes.get("/download/:checkoutId", downloadReceipt);

// Get a checkout by id
checkoutRoutes.get("/:id", getCheckoutById);
