const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadFile = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.files.file;
    const fileExt = path.extname(file.name);
    const fileName = `${uuidv4()}${fileExt}`;
    const uploadPath = path.join(__dirname, '../uploads', fileName);

    if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../uploads'));
    }

    await file.mv(uploadPath);
    res.json({ fileUrl: `/uploads/${fileName}` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'File upload failed' });
  }
};

module.exports = { uploadFile };