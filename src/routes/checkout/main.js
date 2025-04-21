import { Router } from "express";
import createCheckout from "../../controllers/checkout/createCheckout.js";
import { getCheckoutById } from "../../controllers/checkout/getCheckoutById.js";
import { getAllReceipts } from "../../controllers/checkout/getCheckouts.js";
import { downloadReceipt } from "../../controllers/checkout/downloadReceipt.js";
import { createManualReceipt } from "../../controllers/checkout/manualCreate.js";

export const checkoutRoutes = Router();

// Create a new checkout
checkoutRoutes.post("/", createCheckout);

// Create checkout manually
checkoutRoutes.post("/manual", createManualReceipt);

// Get all checkouts
checkoutRoutes.get("/", getAllReceipts);

checkoutRoutes.get("/:id/download", downloadReceipt);

// Get a checkout by id
checkoutRoutes.get("/:id", getCheckoutById);
