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
  let productQuery = Product.find();
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }
  if (req.query.color) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.color, $options: "i" },
    });
  }
  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: "i" },
    });
  }
  // filter product by price
  if (req.query.price) {
    let productPrice = req.query.price.split("-");
    console.log(productPrice);
    productQuery = productQuery.find({
      price: { $gte: productPrice[0], $lte: productPrice[1] },
    });
  }
  const product = await productQuery;
  res.json({
    message: "Success",
    product,
  });
};
