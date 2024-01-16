import Review from "../model/review.js";
import Product from "../model/Product.js";

export const createReview = async (req, res) => {
  const { rating, message } = req.body;
  try {
    const findProduct = await Product.findById(req.params.productId);
    if (!findProduct) {
      return res.status(400).json({
        error: "Product not found.",
      });
    }
    const createdReview = await Review.create({
      message,
      rating,
      product: findProduct._id,
      user: req.userAuthId,
    });

    // resave id of the review in this product
    findProduct.reviews.push(createdReview._id);
    await findProduct.save();

    res.json({
      createdReview,
      findProduct,
      message: "review created successfull.",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
