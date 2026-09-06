const cloudinary = require("../config/cloudinary");
const { PassThrough } = require("stream");

// @desc    Upload image to Cloudinary (Multipart buffer or Base64/URL string)
// @route   POST /api/upload
// @access  Admin
const uploadImage = async (req, res, next) => {
  try {
    const folder = req.body.folder || "new-portsaid";

    // Mode 1: Multipart File Upload (Multer memory storage buffer)
    if (req.file && req.file.buffer) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            return res.status(500).json({ success: false, message: error.message });
          }
          return res.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
          });
        }
      );

      const bufferStream = new PassThrough();
      bufferStream.end(req.file.buffer);
      bufferStream.pipe(uploadStream);
      return;
    }

    // Mode 2: Base64 string or remote image URL
    if (req.body.image) {
      const result = await cloudinary.uploader.upload(req.body.image, { folder });
      return res.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Please provide an image file or base64/URL string",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete image from Cloudinary by public_id
// @route   DELETE /api/upload
// @access  Admin
const deleteImage = async (req, res, next) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ success: false, message: "public_id is required" });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
