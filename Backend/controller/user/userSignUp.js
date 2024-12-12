const bcrypt = require('bcryptjs'); 
const userModel = require('../../models/userModel'); 
async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    // Logging the received email for debugging
    // console.log(req.body.email);

    // Check if a user with the provided email already exists
    const user = await userModel.findOne({ email });
    // console.log(user); // Should return the user document if it exists
      
       

    if (user) {
      throw new Error("User already exists");
    }

    if (!email) {
      throw new Error("Please enter a valid email");
    }
    if (!password) {
      throw new Error("Please enter a valid password");
    }
    if (!name) {
      throw new Error("Please enter a valid name");
    }

    // Generate a salt and hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }

    // Create a new user object with the hashed password
    const payload = {
      ...req.body,
      password: hashedPassword,
    };

    const userData = new userModel(payload);

    // Save the user to the database
    const savedUser = await userData.save();

    // Send a success response
    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully",
    });

  } catch (err) {
    // Send an error response 
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;

