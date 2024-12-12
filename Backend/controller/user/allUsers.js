const userModel  = require("../../models/userModel")
async function allUsersController(req, res) {
    try {
   
        const allUsersData = await userModel.find();
        res.status(200).json({
            data: allUsersData,
            message: 'Successfully retrieved user ID',
            userId: req.userId,
            success: true,
        });
    } catch (err) {
        console.error("Error fetching users:", err); // Log the full error for debugging
        res.status(400).json({
            message: err.message || err, // Safely return the error message
            error: true,
            success: false,
        });
    }
}

module.exports = allUsersController;
