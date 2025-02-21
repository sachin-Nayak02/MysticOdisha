

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ✅ Ensure "uploads/" directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // 🔹 Creates parent directories if missing
}

// ✅ Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // 🔹 Store in "uploads/" directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); // 🔹 Ensures unique filename
        cb(null, uniqueSuffix + path.extname(file.originalname)); // 🔹 Example: "1700001234567-123456789.jpg"
    }
});

// ✅ Initialize Multer
const upload = multer({ storage });

// ✅ Export for use in routes
module.exports = upload;
