import { allowedMimeTypes } from '@/constants';
import multer, { memoryStorage } from 'multer';

const upload = multer({
  storage: memoryStorage(),
  fileFilter: (_req, file, callback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  }
});

export default upload;
