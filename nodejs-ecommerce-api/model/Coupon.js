import mongoose, { mongo } from "mongoose";
const schem = mongoose.Schema;

const couponSchema = schem(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timeStamps: true,
    toJSON: { virtuals: true },
  }
);
// check if coupon is expired
couponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
});
// validation
couponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    return next(new Error("Ending date can't be less than start date"));
  }
  next();
});
couponSchema.pre("validate", function (next) {
  if (this.startDate < Date.now()) {
    return next(new Error("Start date can't be less than Today"));
  }
  next();
});
couponSchema.pre("validate", function (next) {
  if (this.endDate < Date.now()) {
    return next(new Error("Ending date can't be less than Today"));
  }
  next();
});
couponSchema.pre("validate", function (next) {
  if (this.discount <= 0 || this.discount > 100) {
    return next(new Error("Discount can't be less than 0 or more than 100"));
  }
  next();
});
// how many days left for the coupon
couponSchema.virtual("daysLeft").get(function () {
  const daysLeft = `${Math.ceil(
    (this.endDate - Date.now()) / (1000 * 60 * 60 * 24)
  )} days Left`;
  return daysLeft;
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
