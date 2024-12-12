const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    // Use body or query to get the category
    const { category } = req.body || req.query;

    // Log the category to ensure it's being received correctly
    // console.log("Category received:", category);

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
        success: false,
        error: true,
      });
    }

    // Use case-insensitive regex to find products by category
    const products = await productModel.find({
      category: { $regex: new RegExp(category, "i") } // Case-insensitive search
    });

    // Log the result to see if products are found
    // console.log("Products found:", products);

    // Send response with products
    res.json({
      data: products,
      message: "Products found",
      success: true,
      error: false,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWiseProduct;
