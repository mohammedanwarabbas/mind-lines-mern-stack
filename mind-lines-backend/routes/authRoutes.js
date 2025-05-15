const express = require('express');
const router = express.Router();
const { login, register,updateProfile } = require('../controllers/authController');
const {authenticate} = require('./../middlewares/authMiddleware')

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register (Writer registration only)
router.post('/register', register);

// POST /api/auth/update-profile (both writer and admin)
router.post('/update-profile',authenticate,updateProfile);

module.exports = router;