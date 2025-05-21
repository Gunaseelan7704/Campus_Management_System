const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createAssignment, getAssignments, submitAssignment } = require('../controllers/assignmentController');

router.post('/', authMiddleware(['staff']), createAssignment);
router.get('/', authMiddleware(), getAssignments);
router.post('/:id/submit', authMiddleware(['student']), submitAssignment);

module.exports = router;