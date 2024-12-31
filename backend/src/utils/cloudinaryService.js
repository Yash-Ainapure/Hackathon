// import env
require('dotenv').config();
// cloudinary.js
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "", // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY || "",       // Replace with your Cloudinary API key
  api_secret: CLOUDINARY_API_SECRET || "", // Replace with your Cloudinary API secret
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures', // Folder where profile pictures will be stored
    allowed_formats: ['jpg', 'png', 'jpeg'], // Accepted file formats
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
