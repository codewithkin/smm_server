import { Router } from "express";
import createCheckout from "../../controllers/checkout/createCheckout.js";
import { getCheckoutById } from "../../controllers/checkout/getCheckoutById.js";

export const checkoutRoutes = Router();

// Create a new checkout
checkoutRoutes.post("/", createCheckout);

// Get a checkout by id
checkoutRoutes.get("/:id", getCheckoutById);
