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
    code: code.toUpperCase(),
    startDate,
    endDate,
    discount,
  });
  //
  console.log(coupon);
  res.json({
    coupon,
    message:"Coupon Created Successfully."
  });
};

// get all coupons
export const getAllCoupons = async (req, res) => {
  const coupons = await Coupon.find();
  res.json({
    coupons,
  });
};

export const getSingleCoupon = async (req, res) => {
  const coupon = await Coupon.findOne({ _id: req.params.id });
  res.json({
    coupon,
  });
};
export const updateCoupon = async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    {
      code: code?.toUpperCase(),
      startDate,
      endDate,
      discount,
    },
    {
      new: true,
    }
  );
  res.json({
    coupon,
    message: "Coupon Updated Sucessfully.",
  });
};

export const deleteCoupon = async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  res.json({
    coupon,
    message: "Coupon Deleted Sucessfully.",
  });
};
