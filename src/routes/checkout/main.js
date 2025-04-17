import { Router } from "express";

export const checkoutRouter = Router();

checkoutRouter.post("/", createNewCheckout);
