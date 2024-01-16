import Color from "../model/Color.js";

// create a category
export const createColor = async (req, res) => {
  const { name } = req.body;
  // check if color exist or not
  const colorExist = await Color.findOne({ name });
  if (colorExist) {
    return res.status(400).json({
      error: "color already exist.",
    });
  }
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.status(201).json({
    message: "color created successfully.",
    color,
  });
};

// get all the colors
export const getAllColors = async (req, res) => {
  // check if colors exist or not
  const allColors = await Color.find();
  if (!allColors) {
    return res.status(400).json({
      error: "no color exist.",
    });
  }
  res.status(201).json({
    message: "all color fetched successfully.",
    allColors,
  });
};

// get only one color by id
export const getSingleColor = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    res.status(201).json({
      message: "color fetched successfully.",
      color,
    });
  } catch (error) {
    return res.status(400).json({
      error: "no color found.",
    });
  }
};

// update only one color by id
export const deleteColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return new error();
    } else {
      res.json({
        color,
        message: "color deleted successfull.",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "no color found.",
    });
  }
};
// update only one color by id
export const updateColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.status(201).json({
      message: "color updated successfully.",
      color,
    });
  } catch (error) {
    return res.status(400).json({
      error: "no color found.",
    });
  }
};
