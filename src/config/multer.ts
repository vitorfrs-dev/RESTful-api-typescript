import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const name = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname);

    cb(null, name + ext);
  },
});

export default storage;
