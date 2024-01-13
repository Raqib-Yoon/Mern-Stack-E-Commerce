import Product from "../model/Product.js";

export const createProductCtrl = async (req, res, next) => {
  const {
    name,
    descrption,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;
  // check if product exist or not
  const productExist = await Product.findOne({ name });
  if (productExist) {
    return res.status(400).json({
      error: "Product already exist.",
    });
  }
  const product = await Product.create({
    name,
    descrption,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
  });

  res.status(201).json({
    message: "Prodcut created successfully.",
    product,
  });
};

export const getProductsCtrl = async (req, res) => {
  const products = await Product.find();
  console.log(req)
  res.json({
    request,
    message: "Success",
    products,
  });
};
