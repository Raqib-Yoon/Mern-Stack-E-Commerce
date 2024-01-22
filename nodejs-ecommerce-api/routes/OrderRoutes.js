import express from "express";
const orderRouter = express.Router();
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { createOrder } from "../controllers/OrderCtrl.js";

// Order Routes
orderRouter.post("/", isLoggedIn, createOrder);

export default orderRouter;
