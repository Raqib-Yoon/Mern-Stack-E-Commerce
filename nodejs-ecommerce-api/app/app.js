import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnection.js";
const app = express();
import userRouter from "../routes/userRoutes.js";
import productRouter from "../routes/productRoutes.js";
import categoryRouter from "../routes/categoryRoutes.js";

// Database Connect...
dbConnect();

// middlewares
app.use(express.json());
// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

export default app;
