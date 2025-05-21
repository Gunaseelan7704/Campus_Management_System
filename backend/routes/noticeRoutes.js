const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createNotice, getNotices } = require('../controllers/noticeController');

router.post('/', authMiddleware(['admin', 'staff']), createNotice);
router.get('/', authMiddleware(), getNotices);

module.exports = router;