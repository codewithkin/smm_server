import { Router } from "express";
import getAllData from "../../controllers/data/getAllData.js";

export const dataRoutes = Router();

dataRoutes.get("/", getAllData);
