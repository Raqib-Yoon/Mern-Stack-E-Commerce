import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Review must belong to a user"],
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Review must belong to a product"],
      ref: "Product",
    },
    message: {
      type: String,
      required: [true, "Please add a message"],
    },
    rating: {
      type: Number,
      required: [true, "Please add a message"],
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
