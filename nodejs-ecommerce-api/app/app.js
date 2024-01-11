import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnection.js";
const app = express();
import userRouter from "../routes/userRoutes.js"

// Database Connect...
dbConnect();

// middlewares
app.use(express.json())
// routes 
app.use("/",userRouter)

export default app;
