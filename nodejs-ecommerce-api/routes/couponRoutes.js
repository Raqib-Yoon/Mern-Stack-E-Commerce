import express from "express";
const couponRouter = express.Router();
import { createCoupon, getAllCoupons } from "../controllers/couponsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

couponRouter.post("/", isLoggedIn, createCoupon);
couponRouter.get("/", getAllCoupons);

export default couponRouter;
