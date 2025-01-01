const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { sequelize } = require('./models');
const { userRoute } = require('./controllers/users.controller');
const { eventRouter } = require('./controllers/event.controller');
const reportRouter = require('./controllers/reportAr.controller');
const bodyParser = require('body-parser')
const multer = require('multer');

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const app = express();

// Middleware
app.use(cors()); // Enable CORS
// app.use(fileUpload({
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// })); // Handle file uploads in memory
app.use('/api/AR', reportRouter);
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/user', userRoute);
app.use('/api/event', eventRouter);


app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedFile = req.file;

    // Log file details
    console.log('File:', uploadedFile.originalname);
    console.log('MIME Type:', uploadedFile.mimetype);
    console.log('File Size:', uploadedFile.size);

    // Respond with file metadata
    res.status(200).json({
      message: 'File uploaded successfully',
      fileName: uploadedFile.originalname,
      mimeType: uploadedFile.mimetype,
      size: uploadedFile.size,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
});


const port = 5000;
app.listen(port, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log(`Server running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error:', error);
  }
});
