import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoriesCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
const categoryRouter = express.Router();

categoryRouter.post("/", isLoggedIn, createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.put("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);

export default categoryRouter;
