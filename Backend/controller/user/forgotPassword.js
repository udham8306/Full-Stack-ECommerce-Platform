const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Please provide a valid email address");
    }

    // Check if the user exists in the database
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found with this email address");
    }

    // Generate a reset token (JWT)
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const resetToken = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1h", // Token valid for 1 hour
    });

    // Create a reset link containing the token (URL for password reset page)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send the reset link via email
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or any email service provider you use
      auth: {
        user: process.env.EMAIL_USER, // Your email user from environment variables
        pass: process.env.EMAIL_PASSWORD, // Your email password from environment variables
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click the following link to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>This link is valid for 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = forgotPasswordController;
