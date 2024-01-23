import express, { Router } from "express";
const userRouter = express.Router();
import { runValidation } from "../validators/index.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/validator.js";
import {
  loginUserCtrl,
  registerUserCtrl,
  getUserProfileCtrl,
  updateShippingAddress,
} from "../controllers/userControllers.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
userRouter.post(
  "/register",
  userRegisterValidator,
  runValidation,
  registerUserCtrl
);
userRouter.post("/login", userLoginValidator, runValidation, loginUserCtrl);
userRouter.get("/profile", isLoggedIn, getUserProfileCtrl);
userRouter.get("/update/shipping", isLoggedIn, updateShippingAddress);

export default userRouter;
