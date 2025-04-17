import { Router } from "express";
import createCheckout from "../../controllers/checkout/createCheckout.js";

export const checkoutRoutes = Router();

checkoutRoutes.post("/", createCheckout);
