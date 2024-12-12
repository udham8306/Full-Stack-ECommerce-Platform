const userModel = require("../../models/userModel");

const updateUser = async (req, res) => {
  try {
    
   const sessionUser = req.user._id; // Assuming req.userId is set via authentication middleware
   console.log(sessionUser);
    const { userId, name, email, role } = req.body;

    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    // Find the session user to check their role (assuming you need role-based validation)
    const user = await userModel.findById(sessionUser);
    console.log(user.role); // This logs the current user's role

    // Optionally, check if the user has the right permissions to update another user
    // Example: Only admins can update user roles
    // if (user.role !== "admin") {
    //   return res.status(403).json({
    //     message: "You do not have permission to update user roles",
    //     success: false,
    //     error: true,
    //   });
    // }

    // Update the target user
    const updateUserModel = await userModel.findByIdAndUpdate(userId, payload, {
      new: true, // This option returns the updated document
    });
 
    // Check if user was found and updated
    if (!updateUserModel) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      data: updateUserModel,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateUser;
