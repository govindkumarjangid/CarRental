import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Memory storage for Multer
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB file limit
});

/**
 * Uploads a file buffer (image or pdf/document) to Cloudinary natively via upload_stream
 * @param {Buffer} fileBuffer
 * @param {string} originalname
 * @param {string} mimetype
 * @returns {Promise<string>} Cloudinary secure_url
 */
export const uploadToCloudinary = (fileBuffer, originalname = 'file', mimetype = '') => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve("");

    const isImage = mimetype.startsWith('image/');
    const cleanName = originalname.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, '-');

    let options = {};

    if (isImage) {
      options = {
        resource_type: 'image',
        format: 'webp',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto' }
        ],
        public_id: `images/${cleanName}-${Date.now()}`
      };
    } else {
      let ext = (originalname.split('.').pop() || 'pdf').toLowerCase();

      if (ext === 'pdf') ext = 'rawpdf';

      options = {
        resource_type: 'raw',
        type: 'upload',
        access_mode: 'public',
        public_id: `documents/${cleanName}-${Date.now()}.${ext}`
      };
    }

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        console.error('[Cloudinary Upload Stream Error]', error);
        return reject(error);
      }
      resolve(result.secure_url);
    });

    stream.end(fileBuffer);
  });
};

export { cloudinary };