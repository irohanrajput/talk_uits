import express, { json } from "express";
import authRoutes from "./routes/auth.route.js"; //we're importing the auth Router here
const app = express();


app.use("/api/auth", authRoutes);

export default app;
