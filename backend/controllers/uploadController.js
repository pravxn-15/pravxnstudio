const cloudinary = require('../config/cloudinary');

// @desc    Upload image to Cloudinary with Base64 fallback
// @route   POST /api/uploads/image
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const fileMime = req.file.mimetype || 'image/jpeg';

    // Helper function to generate Base64 Data URI
    const getBase64Fallback = () => {
      const base64Data = fileBuffer.toString('base64');
      return `data:${fileMime};base64,${base64Data}`;
    };

    // Check if Cloudinary environment variables are set
    const hasCloudinary = Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );

    if (hasCloudinary) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'pravxnstudio',
              resource_type: 'image'
            },
            (error, result) => {
              if (error) return reject(error);
              return resolve(result);
            }
          );
          uploadStream.end(fileBuffer);
        });

        if (uploadResult && uploadResult.secure_url) {
          return res.status(200).json({
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id
          });
        }
      } catch (cloudinaryError) {
        console.error('[Cloudinary Error - Using Base64 Fallback]:', cloudinaryError.message || cloudinaryError);
      }
    }

    // Fallback: Convert to Base64 Data URI if Cloudinary is not configured or fails
    const dataUri = getBase64Fallback();
    return res.status(200).json({
      url: dataUri,
      publicId: `local_${Date.now()}`
    });
  } catch (error) {
    console.error('[Upload Controller Error]', error);
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
};

module.exports = { uploadImage };
