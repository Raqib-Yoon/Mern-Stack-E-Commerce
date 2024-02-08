import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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
  console.log(orderItems, shippingAddress, totalPrice )
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

  //
  //
  //    make payment (stripe)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Hats",
            description: "Best Hats",
          },
          unit_amount: 10 * 100,
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/canceled",
  });

  res.redirect(303, session.url);

  //    payment webhook
  //    Update the user Order
<<<<<<< HEAD
  res.json({
    // user,
    order,
    msg: "create order",
  });
=======
  // res.json({
  //   // user,
  //   orderItems,
  //   shippingAddress,
  //   totalPrice,
  //   msg: "create order",
  // });
>>>>>>> 7d5570d46f4fbe0a287f274427f0d8a298758dc3
};

export const getSalesSum = async (req, res) => {
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
        minPrice: {
          $min: "$totalPrice",
        },
        maxPrice: {
          $max: "$totalPrice",
        },
        averagePrice: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);

  // get today's sales
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const salesToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  res.status(200).json({
    message: "Sum of the Total Price",
    orders,
    salesToday,
  });
};
