const bcrypt = require("bcryptjs");
const express = require("express");
const crypto = require("crypto");
const User = require("../model/user");
const sendMail = require("../config/nodemailer");
const router = express.Router();

// Verify OTP and Reset Password
router.post("/reset-password", async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Check if OTP is valid and not expired
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = undefined; // Clear OTP
        user.otpExpires = undefined;
        await user.save();

        res.redirect("/mysticodisha/Signup&SignIn");
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
