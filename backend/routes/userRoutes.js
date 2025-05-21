const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUsers, getUsersByRole, deleteUser } = require('../controllers/userController');

// Admin routes
router.get('/', authMiddleware(['admin']), getUsers);
router.get('/:role', authMiddleware(['admin']), getUsersByRole);
router.delete('/:id', authMiddleware(['admin']), deleteUser);

module.exports = router;