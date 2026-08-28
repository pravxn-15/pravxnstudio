const cloudinary = require('../config/cloudinary');

// @desc    Upload image to Cloudinary or base64 fallback
// @route   POST /api/uploads/image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileMime = req.file.mimetype;

    // Check if Cloudinary is configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'pravxnstudio' },
          (error, result) => {
            if (error) {
              console.error('[Cloudinary Upload Error]', error);
              return res.status(500).json({ message: 'Cloudinary upload failed', error: error.message });
            }
            return res.json({
              url: result.secure_url,
              publicId: result.public_id
            });
          }
        );
        uploadStream.end(fileBuffer);
      });
    } else {
      // Fallback: Convert to Base64 Data URI
      const base64Data = fileBuffer.toString('base64');
      const dataUri = `data:${fileMime};base64,${base64Data}`;
      return res.json({
        url: dataUri,
        publicId: `local_${Date.now()}`
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadImage };
