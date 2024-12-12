const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    // Fetch distinct categories from the products collection
    const productCategories = await productModel.distinct("category");
    const productByCategory = [];

    // Loop through each category and fetch the product
    for (const category of productCategories) {
      const products = await productModel.find({ category });
      if (products && products.length > 0) {
        productByCategory.push({
          category,
          products,
        });
      }
    }

    res.status(200).json({
      data: productByCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProduct;
