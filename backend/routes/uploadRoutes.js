import express from 'express';
import path from 'path';
import multer from 'multer';
import uploadFile from './uploadFileRoute.js'

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname.toLowerCase()));
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', upload.single('image'), (req, res) => {
  console.log(req.file)
  res.send(`/${req.file.path}`);
});

router.post('/file', uploadFile.single('product'), (req, res) => {
  console.log(req.file.path)
  res.send(`${req.file.path}`)
})
export default router;
