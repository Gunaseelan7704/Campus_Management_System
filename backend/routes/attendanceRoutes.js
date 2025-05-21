const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');

router.post('/', authMiddleware(['staff']), markAttendance);
router.get('/', authMiddleware(), getAttendance);

module.exports = router;