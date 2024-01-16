import Brand from "../model/Brand.js";

// create a category
export const createBrand = async (req, res) => {
  const { name } = req.body;
  // check if brand exist or not
  const brandExist = await Brand.findOne({ name });
  if (brandExist) {
    return res.status(400).json({
      error: "Brand already exist.",
    });
  }
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.status(201).json({
    message: "brand created successfully.",
    brand,
  });
};

// get all the brands
export const getAllBrands = async (req, res) => {
  // check if brands exist or not
  const allBrands = await Brand.find();
  if (!allBrands) {
    return res.status(400).json({
      error: "no brand exist.",
    });
  }
  res.status(201).json({
    message: "all brand fetched successfully.",
    allBrands,
  });
};

// get only one brand by id
export const getSingleBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.status(201).json({
      message: "brand fetched successfully.",
      brand,
    });
  } catch (error) {
    return res.status(400).json({
      error: "no brand found.",
    });
  }
};

// update only one brand by id
export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return new error();
    } else {
      res.json({
        brand,
        message: "brand deleted successfull.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "no brand found.",
    });
  }
};
// update only one brand by id
export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.status(201).json({
      message: "brand updated successfully.",
      brand,
    });
  } catch (error) {
    return res.status(400).json({
      error: "no brand found.",
    });
  }
};
