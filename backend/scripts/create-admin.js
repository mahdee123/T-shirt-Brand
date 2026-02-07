/**
 * Admin Setup Script
 * 
 * This script helps create the initial admin account.
 * Run this ONCE after starting the backend to create your first admin.
 * 
 * Usage:
 * 1. Ensure backend is running on port 5000
 * 2. Edit ADMIN_EMAIL and ADMIN_PASSWORD below
 * 3. Run: node scripts/create-admin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'password123';

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tshirt_brand');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin already exists with this email!');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create admin
    const admin = new Admin({
      email: ADMIN_EMAIL,
      password: hashedPassword
    });

    await admin.save();
    console.log('\n✓ Admin created successfully!\n');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Password:', ADMIN_PASSWORD);
    console.log('\nGo to http://localhost:3000/admin/login to login\n');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
