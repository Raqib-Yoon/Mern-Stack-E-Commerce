import Review from "../model/Review.js";
import Product from "../model/Product.js";

export const createReview = async (req, res) => {
  const { rating, message } = req.body;
  try {
    const productExist = await Product.findById(req.params.productId).populate(
      "reviews"
    );
    if (!productExist) {
      return res.status(400).json({
        error: "Product not found.",
      });
    }
    // const hasReviewed = await productExist?.reviews?.find((review) => {
    //   return review?.user.toString() === req?.userAuthId.toString();
    // });
    // console.log(hasReviewed);

    // if (hasReviewed) {
    //   return res.status(400).json({
    //     error: "Product has already been reviewed",
    //   });z
    // }

    const createdReview = await Review.create({
      message,
      rating,
      product: productExist._id,
      user: req.userAuthId,
    });
    // resave id of the review in this product
    productExist.reviews.push(createdReview._id);
    await productExist.save();
    
    const newProductExist = await Product.findById(
      req.params.productId
    ).populate("reviews");

    res.json({
      createdReview,
      newProductExist,
      message: "review created successfull.",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
