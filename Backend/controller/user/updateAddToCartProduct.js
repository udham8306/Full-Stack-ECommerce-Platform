const addToCardModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.user._id; 
        const addToCartProductId = req.body.id; // Ensure you're accessing the correct key

        const qty = req.body.quantity;

        // Update the product based on the ID
        const updateProduct = await addToCardModel.updateOne(
            { _id: addToCartProductId }, // Filter for the product by ID
            { $set: { quantity: qty } } // Use $set to update the quantity
        );

        res.json({
            message: "Product updated",
            data: updateProduct,
            error: false,
            success: true,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err, 
            error: true,
            success: false,
        });
    }
};

module.exports = updateAddToCartProduct;
