// use run [node scripts/seedAdmin.js](to run mannually once) or [npm run seed:admin]
require('dotenv').config(); // Load .env variables
const User = require('../models/User');
const connectDB = require('../config/db');

// Admin credentials from .env (or defaults for development)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'securepassword123';

connectDB().then(async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      username: ADMIN_USERNAME,
      role: 'admin' 
    });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      return process.exit(0);
    }

    // Create new admin
    await User.create({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD, // Auto-hashed by User model
      role: 'admin'
    });

    console.log('✅ Admin user created successfully');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    process.exit();
  }
});