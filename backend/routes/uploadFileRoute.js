import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'files/');
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const checkFileType = (file, cb) => {
    const filetypes = /zip|rar|7z/;
    const extname = filetypes.test(path.extname(file.originalname.toLowerCase()));
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Compressed files only!');
    }
  };
  
  const uploadFile = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  });

export default uploadFile;
