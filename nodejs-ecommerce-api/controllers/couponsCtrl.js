import Coupon from "../model/Coupon.js";


export const createCoupon = (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  res.json({ code, startDate, endDate, discount });
};
