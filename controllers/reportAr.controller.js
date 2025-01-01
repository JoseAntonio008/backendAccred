const express = require("express");
const multer = require('multer');

// Use memory storage to handle the file as a buffer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
const reportRouter = express.Router();
const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedFile = req.file;

    // Set headers for downloading the file
    res.set({
      "Content-Type": uploadedFile.mimetype,
      "Content-Disposition": `attachment; filename="${uploadedFile.originalname}"`,
    });

    // Send the file buffer
    res.send(uploadedFile.buffer);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

reportRouter.post("/upload", upload.single('file'), uploadFile);

module.exports = reportRouter;
