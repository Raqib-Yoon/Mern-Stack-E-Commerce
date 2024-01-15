import express from "express";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
} from "../controllers/categoriesCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
const categoryRouter = express.Router();

categoryRouter.post("/", isLoggedIn, createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getSingleCategory);

export default categoryRouter;
