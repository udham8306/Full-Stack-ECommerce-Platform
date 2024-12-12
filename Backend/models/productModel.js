const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true, // Make the name required
    },
    brandName: {
        type: String,
        required: true, // Make the brand name required
    },
    category: {
        type: String, // Updated to be a single string
        required: true, // Make the category required
    },
    productImage: {
        type: [String], // Changed to an array of strings
        required: true, // Make the productImage required
    },
    description: {
        type: String,
        required: true, // Make the description required
    },
    price: {
        type: Number,
        required: true, // Make the price required
    },
    sellingPrice: {
        type: Number,
        required: true, // Make the sellingPrice required
    },
    specifications: { // Add specifications field
        type: Object, // Use an object to store key-value pairs
        default: {}, // Default to an empty object
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
