import mongoose, { mongo } from "mongoose";
const schem = mongoose.Schema;

const couponSchema = schem({
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
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
