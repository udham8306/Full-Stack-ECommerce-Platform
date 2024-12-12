const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Optionally make the name required
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, // Ensure the password is required
    },
    profilePicture: {
        type: String,
        default: '', // Optional: Provide a default value if not provided
    },
    role : {
        type : String ,
        default : 'GENERAL'
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User; 
