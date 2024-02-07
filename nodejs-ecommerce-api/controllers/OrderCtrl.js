import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/Coupon.js";

export const createOrder = async (req, res) => {
  const { coupon } = req?.query;
  // check if coupon expired or not
  const couponFound = await Coupon.findOne({ code: coupon?.toUpperCase() });
  if (couponFound?.isExpired) {
    return res.status(400).json({
      error: "Coupon has ben exipred",
    });
  }
  if (coupon && !couponFound) {
    return res.status(400).json({
      error: "Coupon does not exist",
    });
  }

  const discount = couponFound?.discount / 100;
  //    find the user that wnat the order
  const user = await User.findById(req.userAuthId);
  //    Get the payload (customer, orderItems, shippingAddress, totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  //    check if order is not empty
  if (orderItems.length <= 0) {
    return res.status(400).json({
      error: "Order is empty.",
    });
  }
  //    place/create order nad save into DataBase
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
  });
  //    Update the product qty
  const products = await Product.find({ _id: { $in: orderItems } });
  orderItems?.map(async (orderItem) => {
    const product = products?.find((product) => {
      return product?._id?.toString() === orderItem?._id?.toString();
    });
    if (product) {
      product.totalSold += orderItem.buyingQuantity;
    }
    await product?.save();
  });
  //   push order into the user
  user?.orders?.push(order);
  await user.save();
  //    make payment (stripe)
  //    payment webhook
  //    Update the user Order
  res.json({
    // user,
    order,
    msg: "create order",
  });
};
