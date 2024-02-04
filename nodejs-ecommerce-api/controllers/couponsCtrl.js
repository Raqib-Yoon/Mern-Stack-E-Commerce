import Coupon from "../model/Coupon.js";

export const createCoupon = async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  // check if coupon is already in the database
  const couponExist = await Coupon.findOne({ code });
  if (couponExist) {
    return res.status(400).json({
      error: "coupon aleady exist. please try again",
    });
  }
  // discount value must be a number
  if (!Number(discount)) {
    return res.status(400).json({
      error: "discount value must be a number",
    });
  }
  // if coupon don't exist then create a new coupon
  const coupon = await Coupon.create({
    user: req.userAuthId,
    code,
    startDate,
    endDate,
    discount,
  });
  //
  console.log(coupon);
  res.json({
    coupon,
  });
};

// get all coupons
export const getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  res.json({
    coupons,
  });
};
