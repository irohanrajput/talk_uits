import express, { json } from "express";
import authRoutes from "./routes/auth.route.js";
const app = express();


app.use("/api/auth", authRoutes);

export default app;
