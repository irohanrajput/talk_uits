import express from "express";
import cors from 'cors'
import authRoutes from "./routes/auth.route.js"; //we're importing the auth Router here

const app = express();

app.use(cors())
app.use(express.json()) //to parse incoming requests with json payloads, eg to destruct {name, email} = req.body()
app.use("/api/auth", authRoutes);

export default app;
