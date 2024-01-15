import Category from "../model/Category.js";

// create a category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  // check if category exist or not
  const categoryExist = await Category.findOne({ name });
  if (categoryExist) {
    return res.status(400).json({
      error: "Category already exist.",
    });
  }
  const category = await Category.create({
    name,
    user: req.userAuthId,
  });

  res.status(201).json({
    message: "category created successfully.",
    category,
  });
};

// get all the categories

export const getAllCategories = async (req, res) => {
  // check if category exist or not
  const allCategoreis = await Category.find();
  if (!allCategoreis) {
    return res.status(400).json({
      error: "no category exist.",
    });
  }
  res.status(201).json({
    message: "all categories fetched successfully.",
    allCategoreis,
  });
};

// get only one category by id
export const getSingleCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(201).json({
    message: "category fetched successfully.",
    category,
  });
};
