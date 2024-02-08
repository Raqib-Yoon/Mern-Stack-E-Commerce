import express, { Router } from "express";
const productRouter = express.Router();
import {
  createProductCtrl,
  getAllProductsCtrl,
  getSingleProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} from "../controllers/productsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import upload from "../config/uploadFiles.js";
import isAdmin from "../middlewares/isAdmin.js";

// product CRUD routes
productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("file"),
  createProductCtrl
);
productRouter.get("/", getAllProductsCtrl);
productRouter.get("/:id", getSingleProductCtrl);
productRouter.put("/update/:id", isLoggedIn, isAdmin, updateProductCtrl);
productRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteProductCtrl);

export default productRouter;
