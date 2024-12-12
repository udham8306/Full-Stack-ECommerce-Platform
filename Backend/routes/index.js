const express = require('express');
const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsersController = require("../controller/user/allUsers")
const updateUserController = require("../controller/user/updateUser")
const uploadProductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct")
const getCategoryProductController = require("../controller/product/getCategoryProductOne")
const getCategoryWiseProductController = require("../controller/product/getCategoryWiseProduct")
const getProductDetailsController = require("../controller/product/getProductDetails")
const addToCartController = require("../controller/user/addToCart")
const countaddToCartProductController = require("../controller/user/countAddToCartProduct")
const addToCartViewProductController = require("../controller/user/addToCartViewProduct")
const updateAddToCartProductController = require("../controller/user/updateAddToCartProduct")
const deleteCartProductController = require("../controller/user/deleteCartProduct")
const searchProductController = require("../controller/product/searchProduct")
const forgotPasswordController = require("../controller/user/forgotPassword")
const filterProductsController = require("../controller/product/filterProducts");
const paymentController = require('../controller/order/paymentController');
const webhookController = require("../controller/order/webhook")

router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);  // Corrected route with leading '/'
router.get("/allUser", allUsersController);
router.post("/update-user" ,authToken ,updateUserController);
router.post("/upload-product",authToken,uploadProductController);
router.get("/get-products",getProductController);
router.post("/update-product",authToken,updateProductController);
router.get("/get-categoryProduct",getCategoryProductController)
router.post("/get-categoryWiseProduct",getCategoryWiseProductController);
router.post("/get-productDetails", getProductDetailsController);
router.post("/addToCart",authToken ,addToCartController);
router.get("/countaddToCartProduct",authToken ,countaddToCartProductController)
router.get("/cartViewProduct",authToken,addToCartViewProductController)
router.post("/updateCartProduct",authToken, updateAddToCartProductController)
router.post("/deleteCartProduct",authToken, deleteCartProductController)
router.get("/search-product",searchProductController)
router.post("/forgot-password",forgotPasswordController);
router.post("/filter-product",filterProductsController);


//payment and order
router.post("/checkout",authToken, paymentController)
router.post("/webhook",webhookController)

module.exports = router;
