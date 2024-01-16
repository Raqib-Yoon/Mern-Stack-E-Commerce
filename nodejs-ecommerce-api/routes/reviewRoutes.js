import express from "express";
import { createReview } from "../controllers/reviewCtrl.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";
const reviewRouter = express.Router();

reviewRouter.post("/:productId", isLoggedIn, createReview);

export default reviewRouter;
