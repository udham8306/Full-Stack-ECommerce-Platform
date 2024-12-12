const productModel = require("../../models/productModel");
const productUploadPermission = require("../../helper/permision");

const uploadProductController = async (req, res) => {
    try {
        // Check user permission
        const sessionUserId = req.user._id;
        if (!productUploadPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        // Create a new product with the provided data
        const uploadProduct = new productModel(req.body);

        // Save the product to the database
        const saveProduct = await uploadProduct.save();

        // Respond with success
        res.status(201).json({
            message: "Product uploaded successfully",
            data: saveProduct,
            error: false,
            success: true,
        });
    } catch (error) {
        // Respond with error
        console.error("Product upload failed:", error); // Log the error for debugging
        res.status(400).json({
            message: error.message || "An error occurred",
            error: true,
            success: false,
        });
    }
};

module.exports = uploadProductController;
