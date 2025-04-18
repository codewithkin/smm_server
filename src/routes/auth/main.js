import { Router } from "express";
import login from "../../controllers/auth/login.js";

export const authRoutes = Router();

// Login route
authRoutes.post("/login", login);
