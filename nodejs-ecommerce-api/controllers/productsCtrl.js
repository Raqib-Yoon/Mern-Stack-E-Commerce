import Category from "../model/Category.js";
import Product from "../model/Product.js";
import Brand from "../model/Brand.js";
import Color from "../model/Color.js";

// @desc    Create new product
// @route   POST /api/v1/products
// @access  Private/Admin

export const createProductCtrl = async (req, res) => {
  const { name, descrption, brand, category, sizes, colors, price, totalQty } =
  req.body;
console.log(req.body);

const convertedImgs = req.files.map((file) => file?.path);

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
  // check if the brand exist
  const brandExist = await Brand.findOne({ name: brand?.toLowerCase() });
  if (!brandExist) {
    return res.status(400).json({
      error: "brand dont exist please add the brand first.",
    });
  }
  // check if the color exist
  const colorExist = await Color.findOne({ name: colors });
  if (!colorExist) {
    return res.status(400).json({
      error: "color dont exist please add the color first.",
    });
  }
  // save the product
  const product = await Product.create({
    name,
    descrption,
    brand: brand?.toLowerCase(),
    category: category?.toLowerCase(),
    sizes,
    colors: colors?.toLowerCase(),
    user: req?.userAuthId,
    price,
    totalQty,
    images: convertedImgs,
  });

  // save the product id in the product part of the categor
  categoryExist?.products?.push(product._id);
  // resave the category
  await categoryExist.save();

  // save the product id in the product part of the brand
  brandExist?.products?.push(product._id);
  // resave the brand
  await brandExist.save();

  // save the product id in the product part of the color
  colorExist?.products?.push(product._id);
  // resave the brand
  await colorExist.save();

  // send the response
  res.status(201).json({
    message: "Prodcut created successfully.",
    product,
  });
};

// get products

export const getAllProductsCtrl = async (req, res) => {
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
    pagination,
    result: product.length,
    message: "Success",
    product,
  });
};
// get a single product
export const getSingleProductCtrl = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("reviews");
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
