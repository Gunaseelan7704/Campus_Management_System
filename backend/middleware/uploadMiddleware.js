const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx|txt)$/)) {
      return cb(new Error('Please upload a document file (PDF, DOC, DOCX, TXT)'));
    }
    cb(null, true);
  }
});

module.exports = upload;