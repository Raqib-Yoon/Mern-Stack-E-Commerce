import mongoose, { model } from "mongoose";
const schema = mongoose.Schema;

const ProductSchema = schema(
  {
    name: {
      type: String,
      required: true,
    },
    descrption: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: [
      {
        type: String,
        default: "images link here from google or else",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
// get the total reviews
ProductSchema.virtual("totalReviews").get(function () {
  const product = this;
  const totalReviews = product?.reviews?.length;
  return totalReviews;
});
// get the average ratings reviews
ProductSchema.virtual("averageRating").get(function () {
  let totalRatings = 0;
  const product = this;
  product?.reviews?.forEach((review) => {
    // find all the ratings
    totalRatings += review.rating;
  });
  // calculate average ratings
  const averageRating = Number(totalRatings / product?.reviews?.length).toFixed(
    1
  );
  return averageRating;
});
// introduce product schema to the mongodb database
const Product = mongoose.model("Product", ProductSchema);
// export product model
export default Product;
