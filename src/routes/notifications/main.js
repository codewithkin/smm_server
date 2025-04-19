import { Router } from "express";
import getAllNotifications from "../../controllers/notifications/getAllNotifications.js";

export const notificationRoutes = Router();

// Get all notifications
notificationRoutes.get("/", getAllNotifications);