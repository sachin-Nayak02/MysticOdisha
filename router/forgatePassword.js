const express = require("express");
const crypto = require("crypto");
const User = require("../model/user");
const sendMail = require("../config/nodemailer");

const router = express.Router();

// Generate and send OTP
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Generate OTP (6-digit random number)
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

        // Update user with OTP
        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP via email
        await sendMail(email, "Password Reset OTP", `Your OTP is: ${otp} ,OTP Expire in 5 minute.Thank you for Joining our Platform , We Are Greatful To you`);

        res.render("./clientSide/forgatePassResetPass")
        // res.json({ message: "OTP sent to your email" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error or email does not exist" });
    }
});

module.exports = router;
