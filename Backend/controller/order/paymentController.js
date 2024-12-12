const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;
    console.log("cartItems", cartItems);
    
    // Fetch the user data
    const user = await userModel.findOne({ _id: req.user._id });
    
    if (!user || !user.email) {
      return res.status(400).json({ message: "User not found or email missing" });
    }

    const params = {
      submit_type: "pay", 
      mode: "payment",
      payment_method_types: ["card"], 
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1Q3LeGFVxengQu0jwshlpkpa",
        },
      ],
      customer_email: user.email,
      metadata : {
        userId : req.user._id,
      },
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: [item.productId.productImage[0]], // First image in the array
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice * 100, // Convert dollars to cents
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params); 
    res.status(200).json(session); // 200 OK for successful session creation
  } catch (error) {
    console.error("Stripe error:", error); // Additional logging for debugging
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
