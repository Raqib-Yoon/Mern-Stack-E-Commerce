import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
} from "../controllers/brandsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
const brandRouter = express.Router();

brandRouter.post("/", isLoggedIn, createBrand);
brandRouter.get("/", getAllBrands);
brandRouter.get("/:id", getSingleBrand);
brandRouter.put("/update/:id", updateBrand);
brandRouter.delete("/delete/:id", deleteBrand);

export default brandRouter;