const mongoose = require('mongoose');

const addToCard = new mongoose.Schema({
    productId :{
        ref : "Product",
        type : String,

    },
    quantity : Number ,
    userId : String,
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const addToCardModel = mongoose.model('AddToCart', addToCard);

module.exports = addToCardModel;
