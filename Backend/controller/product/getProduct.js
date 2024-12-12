const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    // Await the result of the find operation
    const allProducts = await productModel.find().sort({ createdAt: -1 });
    
    // Send the response
    res.json({
      message: "All Products",
      success: true,
      error: false,
      data: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
