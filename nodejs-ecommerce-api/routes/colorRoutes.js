import express from "express";
import {
  createColor,
  deleteColor,
  getAllColors,
  getSingleColor,
  updateColor,
} from "../controllers/colorsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
const colorRouter = express.Router();

colorRouter.post("/", isLoggedIn, createColor);
colorRouter.get("/", getAllColors);
colorRouter.get("/:id", getSingleColor);
colorRouter.put("/update/:id", updateColor);
colorRouter.delete("/delete/:id", deleteColor);

export default colorRouter;
