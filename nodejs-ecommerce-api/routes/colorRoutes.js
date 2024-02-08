import express from "express";
import {
  createColor,
  deleteColor,
  getAllColors,
  getSingleColor,
  updateColor,
} from "../controllers/colorsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
const colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, isAdmin, createColor);
colorRouter.get("/", getAllColors);
colorRouter.get("/:id", getSingleColor);
colorRouter.put("/update/:id", isLoggedIn, isAdmin, updateColor);
colorRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteColor);

export default colorRouter;
