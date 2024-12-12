const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
    try {
        const {productId }= req.body 
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        res.json({
            data: product,
            message: "Ok",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = getProductDetails;
