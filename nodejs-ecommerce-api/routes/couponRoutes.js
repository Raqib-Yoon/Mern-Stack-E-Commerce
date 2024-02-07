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

couponRouter.post("/", isLoggedIn, createCoupon);
couponRouter.get("/", getAllCoupons);
couponRouter.get("/:id", getSingleCoupon);
couponRouter.put("/update/:id", updateCoupon);
couponRouter.delete("/delete/:id", deleteCoupon);

export default couponRouter;
