const addToCardModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure req.user is populated via authentication middleware

    // Count the number of products in the user's cart
    const count = await addToCardModel.countDocuments({
      userId: userId,
    });

    // Return the count in the response
    res.json({
      data: {
        count: count,
      },
      message: "Ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
