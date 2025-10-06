import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Storage config for multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload image endpoint
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ url: fileUrl });
});

export default router;
