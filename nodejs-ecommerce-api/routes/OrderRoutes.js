import express from "express";
const orderRouter = express.Router();
import isLoggedIn from "../middlewares/isLoggedIn.js";
import { createOrder, getSalesSum } from "../controllers/orderCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";

// Order Routes
orderRouter.post("/", isLoggedIn, isAdmin, createOrder);
orderRouter.get("/sales/sum", isLoggedIn, getSalesSum);

export default orderRouter;
