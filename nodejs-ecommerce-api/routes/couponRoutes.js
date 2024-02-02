import express from "express";
const couponRouter = express.Router();
import { createCoupon } from "../controllers/couponsCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

couponRouter.post("/", isLoggedIn, createCoupon);

export default couponRouter;
