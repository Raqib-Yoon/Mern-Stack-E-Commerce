import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
} from "../controllers/brandsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
const brandRouter = express.Router();

brandRouter.post("/", isLoggedIn, isAdmin, createBrand);
brandRouter.get("/", getAllBrands);
brandRouter.get("/:id", getSingleBrand);
brandRouter.put("/update/:id", isLoggedIn, isAdmin, updateBrand);
brandRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteBrand);

export default brandRouter;
