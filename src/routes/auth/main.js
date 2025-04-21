import { Router } from "express";
import login from "../../controllers/auth/login.js";
import savePushToken from "../../controllers/notifications/savePushToken.js";

export const authRoutes = Router();

// Login route
authRoutes.post("/login", login);

authRoutes.post("/save-push-token", savePushToken);