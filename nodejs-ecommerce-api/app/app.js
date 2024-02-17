import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dbConnect from "../config/dbConnection.js";
const app = express();
import {
  userRouter,
  productRouter,
  brandRouter,
  colorRouter,
  categoryRouter,
  reviewRouter,
  orderRouter,
  couponRouter,
} from "../routes/index.js";

// Database Connect...
dbConnect();

// middlewares
app.use(express.json());
app.use(cors());
// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/colors", colorRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/coupons", couponRouter);

export default app;
