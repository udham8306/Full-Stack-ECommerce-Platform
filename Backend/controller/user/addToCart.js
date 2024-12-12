const addToCartModel = require("../../models/cartProduct");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const sessionUser = req.user._id; // Assuming `req.user` contains the logged-in user info
    
    // Check if the product is already in the user's cart
    const isProductAvailable = await addToCartModel.findOne({
      productId: productId,
      userId: sessionUser, // Ensure you are checking within the current user's cart
    });
    
    if(!sessionUser) 
    {
      return res.json({
        message: "User not logged in",
        loginStatus:false,
        success: false,
        error: true,
      });
    }
    if (isProductAvailable) {
      return res.json({
        message: "Already exists in cart",
        success: true,
        loginStatus:true,
        error: false,
      });
    }

    // Prepare the payload for a new cart entry
    const payload = {
      productId: productId,
      quantity: 1, // Default quantity is 1
      userId: sessionUser,
    };

    const newAddToCart = new addToCartModel(payload);

    // Save the new cart product
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product added",
      success: true,
      loginStatus:true,
      error: false,
    });

  } catch (err) {
    return res.status(400).json({
      message: err?.message || "An error occurred",
      error: true,
      success: false,
    });
  }
};

module.exports = addToCart;



