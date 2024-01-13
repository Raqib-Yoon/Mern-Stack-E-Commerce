import express, { Router } from "express";
const productRouter = express.Router();
import {
  createProductCtrl,
  getProductsCtrl,
} from "../controllers/productCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

// product CRUD routes
productRouter.post("/", isLoggedIn, createProductCtrl);
productRouter.get("/", getProductsCtrl);

export default productRouter;
