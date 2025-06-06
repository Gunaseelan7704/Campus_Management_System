const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
// Auth routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;