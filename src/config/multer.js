import multer from "multer";
import path from "path";
import fs from "fs";

// Define uploads directory inside src
const uploadDir = path.join(path.resolve(), "src/uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configure storage for uploaded files
const storage = multer.diskStorage({
  // Set destination folder for uploads
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  // Set filename for uploaded file (timestamp + original name)
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only CSV files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only CSV files are allowed"), false); // Reject other files
  }
};

// Export configured multer instance
const upload = multer({ storage, fileFilter });

export default upload;
