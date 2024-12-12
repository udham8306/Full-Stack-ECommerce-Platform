const productModel = require("../../models/productModel");

const filterProducts = async (req, res) => {
  try {
    // Check the request body for categories
    const categoryList = req?.body?.category || []; // Should be an array
   

    const products = await productModel.find({
      category: {
        "$in": categoryList, // Match any of the categories
      },
    });

    console.log("Fetched Products:", products); // Log fetched products

    res.json({
      data: products,
      message: "Products fetched successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = filterProducts;
