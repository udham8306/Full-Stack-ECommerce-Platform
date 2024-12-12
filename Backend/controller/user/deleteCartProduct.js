const addToCardModel = require("../../models/cartProduct");

const deleteCartProduct = async(req,res) => {
    try {
   
        const currentUserId = req.user._id; 
        const addToCartProductId = req.body.id; 

        const deleteProduct = await addToCardModel.deleteOne({ _id: addToCartProductId });


        res.json({
            message: "Product Deleted from Cart", 
            error: false,
            success: true,
            data :deleteProduct
        });

    } catch (err) {
       
        res.status(400).json({
            message: err.message || err, 
            error: true,
            success: false,
        });
    }
}


module.exports = deleteCartProduct