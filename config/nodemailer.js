const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // App password (not your email password)
    },
});

const sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text,
        });
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};

module.exports = sendMail;
