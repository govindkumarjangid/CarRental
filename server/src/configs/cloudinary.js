import { v2 as cloudinary } from 'cloudinary';
import CloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');
    const isImage = file.mimetype.startsWith('image/');
    const cleanName = file.originalname.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, '-');

    if (isPdf || !isImage) {
      const ext = file.originalname.split('.').pop() || 'pdf';
      return {
        resource_type: 'raw',
        public_id: `${cleanName}-${Date.now()}.${ext}`,
      };
    }

    return {
      resource_type: 'image',
      format: 'webp',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' }
      ],
      public_id: `${cleanName}-${Date.now()}`
    };
  },
});

export const upload = multer({ storage: storage });
export { cloudinary };