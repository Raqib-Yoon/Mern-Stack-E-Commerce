import Category from "../model/Category.js";
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
  // check if the category exist

  const categoryExist = await Category.findOne({ name: category });
  if (!categoryExist) {
    return res.status(400).json({
      error: "Category dont exist please add the category first.",
    });
  }
  // save the product
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

  // save the product id in the product part of the category
  categoryExist.products.push(product._id);
  // resave the category
  await categoryExist.save();

  res.status(201).json({
    message: "Prodcut created successfully.",
    product,
  });
};

// get products

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

  // pagination implement
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 1;
  const skip = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments();
  productQuery = productQuery.skip(skip).limit(limit);
  console.log("this is the total ", total);
  // pagination result =
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (skip > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const product = await productQuery;
  res.json({
    // total,
    pagination,
    // result: product.length,
    message: "Success",
    product,
  });
};
// get a single product
export const getProductCtrl = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(400).json({
      error: "Product not found",
    });
  }
  res.json({
    message: "Product finded successfully.",
    product,
  });
};

// update a single product
export const updateProductCtrl = async (req, res) => {
  const id = req.params.id;
  const { name, descrption, brand, category, sizes, colors, price, totalQty } =
    req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      descrption,
      brand,
      category,
      sizes,
      colors,
      price,
      totalQty,
    },
    {
      new: true,
    }
  );

  res.json({
    updatedProduct,
    message: "Product updated sucessfull.",
  });
};

// update a single product
export const deleteProductCtrl = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({
    message: "Product deleted sucessfull.",
  });
};
