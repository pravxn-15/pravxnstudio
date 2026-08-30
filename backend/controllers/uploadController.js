const cloudinary = require('../config/cloudinary');

// @desc    Upload image to Cloudinary or base64 fallback
// @route   POST /api/uploads/image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileMime = req.file.mimetype || 'image/jpeg';

    // Check if Cloudinary credentials exist in process.env
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      return new Promise((resolve) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'pravxnstudio',
            resource_type: 'auto'
          },
          (error, result) => {
            if (error) {
              console.error('[Cloudinary Upload Error]', error);
              res.status(500).json({
                message: 'Cloudinary upload failed: ' + (error.message || 'Unknown error'),
                error: error.message
              });
              return resolve();
            }
            res.status(200).json({
              url: result.secure_url,
              publicId: result.public_id
            });
            return resolve();
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
    console.error('[Upload Error]', error);
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
};

module.exports = { uploadImage };
