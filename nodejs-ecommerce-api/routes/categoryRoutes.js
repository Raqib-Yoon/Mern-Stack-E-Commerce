import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categoriesCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
const categoryRouter = express.Router();

categoryRouter.post("/", isLoggedIn, isAdmin, createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.put("/update/:id", isLoggedIn, isAdmin, updateCategory);
categoryRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCategory);

export default categoryRouter;
