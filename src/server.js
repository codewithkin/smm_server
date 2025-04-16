import express, { json } from "express";
import { router } from "./routes/main.js";
import morgan from "morgan";

const app = express();

// Middleware

// Log requests (useful for dev debugging)
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

// Allow express to parse JSON content properly
app.use(json());

// Routes
app.use("/api/smm", router);

// Catch-all route
app.use("/", (_, res) => {
  res.status(404).json({
    message: "Sorry, this route doesn't exist",
  });
});

// Listen for requests
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});