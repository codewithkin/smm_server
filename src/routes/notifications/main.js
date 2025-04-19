import { Router } from "express";

export const notificationRoutes = Router();

// Get all notifications
notificationRoutes.get("/", getAllNotifications);