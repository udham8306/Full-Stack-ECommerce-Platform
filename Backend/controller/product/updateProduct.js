const productModel = require("../../models/productModel");
const productUploadPermission = require("../../helper/permision");

async function updateProductController(req, res) {
  try {
    const sessionUserId = req.user._id;
    if (!productUploadPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    // Ensure product ID is passed
    const { _id, ...resBody } = req.body;
   
 
    // Update product
    const updatedProduct = await productModel.findByIdAndUpdate(_id, resBody, {
      new: true, // return the updated product
    });

    if (!updatedProduct) {
      throw new Error("Product not found or update failed");
    }

    res.json({
      message: "Product updated successfully",
      data: updatedProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = updateProductController;
