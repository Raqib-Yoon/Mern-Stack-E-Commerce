import express from "express";
const couponRouter = express.Router();
import {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/couponsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

couponRouter.post("/", isLoggedIn, isAdmin, createCoupon);
couponRouter.get("/", getAllCoupons);
couponRouter.get("/:id", getSingleCoupon);
couponRouter.put("/update/:id", isLoggedIn, isAdmin, updateCoupon);
couponRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCoupon);

export default couponRouter;
