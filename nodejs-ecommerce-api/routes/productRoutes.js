import express, { Router } from "express";
const productRouter = express.Router();
import {
  createProductCtrl,
  getProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} from "../controllers/productsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

// product CRUD routes
productRouter.post("/", isLoggedIn, createProductCtrl);
productRouter.get("/", getProductsCtrl);
productRouter.get("/:id", getProductCtrl);
productRouter.put("/update/:id", isLoggedIn, updateProductCtrl);
productRouter.delete("/delete/:id", isLoggedIn, deleteProductCtrl);

export default productRouter;
