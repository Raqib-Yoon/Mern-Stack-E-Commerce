import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";

export const createOrder = async (req, res) => {
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
  //    place/create order -save into DataBase
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });
  //   push order into the user
  user?.orders?.push(order);
  await user.save();
  //    Update the product qty
  const products = await Product.find({ _id: { $in: orderItems } });
  console.log(products);
  orderItems?.map(async (orderItem) => {
    const product = products?.find((product) => {
      return product?._id?.toString() === orderItem?._id?.toString();
    });
    if (product) {
      product.totalSold += orderItem.totalQtyBuying;
    }
    await product.save();
  });
  //    make payment (stripe)
  //    payment webhook
  //    Update the user Order
  res.json({
    // user,
    orderItems,
    shippingAddress,
    totalPrice,
    msg: "create order",
  });
};
