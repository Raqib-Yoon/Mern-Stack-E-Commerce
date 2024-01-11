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
} from "../controllers/userControllers.js";
userRouter.post("/register", userRegisterValidator, runValidation,registerUserCtrl);
userRouter.post("/login", userLoginValidator, runValidation, loginUserCtrl);
userRouter.get("/profile", getUserProfileCtrl);

export default userRouter;
