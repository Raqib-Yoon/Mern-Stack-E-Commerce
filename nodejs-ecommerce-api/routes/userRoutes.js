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
} from "../controllers/userControllers.js";
userRouter.post(
  "/api/v1/users/register",
  userRegisterValidator,
  runValidation,
  registerUserCtrl
);
userRouter.post(
  "/api/v1/users/login",
  userLoginValidator,
  runValidation,
  loginUserCtrl
);

export default userRouter;
