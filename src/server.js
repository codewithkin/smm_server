import express from "express";
import { router } from "./routes/main";

const app = express();

// Middleware

// Routes
app.use("/api/smm", router);

// Catch-all route
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Sorry, this route doesn't exist"
    })
})  