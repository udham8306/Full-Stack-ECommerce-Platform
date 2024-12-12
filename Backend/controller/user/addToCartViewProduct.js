const addToCardModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
    try {
        
        const sessionUser = req.user._id; 


        const allCartProduct = await addToCardModel.find({
            userId: sessionUser
        }).populate("productId");

        // Send response only if there is no error
        res.json({
            data: allCartProduct,
            message: "Products fetched successfully", // A success message
            error: false,
            success: true,
        });
        
    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred", 
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartViewProduct;
