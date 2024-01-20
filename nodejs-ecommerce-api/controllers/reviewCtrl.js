import Review from "../model/review.js";
import Product from "../model/Product.js";

export const createReview = async (req, res) => {
  const { rating, message } = req.body;
  try {
    const productExist = await Product.findById(req.params.productId);
    if (!productExist) {
      return res.status(400).json({
        error: "Product not found.",
      });
    }
    const createdReview = await Review.create({
      message,
      rating,
      product: productExist._id,
      user: req.userAuthId,
    });

    // resave id of the review in this product
    productExist.reviews.push(createdReview._id);
    await productExist.save();

    res.json({
      createdReview,
      productExist,
      message: "review created successfull.",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
