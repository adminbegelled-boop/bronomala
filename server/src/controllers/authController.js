const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { JWT_SECRET } = require('../middleware/auth');

// Seed or sync default admin
const seedInitialAdmin = async () => {
  try {
    const email = (process.env.ADMIN_EMAIL || 'admin@firewell.com').toLowerCase().trim();
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = process.env.ADMIN_NAME || 'Farewell Admin';

    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({
        name,
        email,
        password,
        role: 'superadmin',
      });
      await admin.save();
      console.log(`[Admin Seeder] Created default admin account: ${email}`);
    } else {
      // Ensure the default password matches
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        admin.password = password; // pre-save will re-hash
        await admin.save();
        console.log(`[Admin Seeder] Synchronized default password for admin: ${email}`);
      }
    }
  } catch (error) {
    console.error('[Admin Seeder] Failed to seed default admin:', error.message);
  }
};

// Admin Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let admin = await Admin.findOne({ email: normalizedEmail });

    const defaultEmail = (process.env.ADMIN_EMAIL || 'admin@firewell.com').toLowerCase().trim();
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // If admin is not found in database:
    // Auto-create if credentials match the configured/default admin credentials
    if (!admin) {
      if (normalizedEmail === defaultEmail && password === defaultPassword) {
        admin = new Admin({
          name: process.env.ADMIN_NAME || 'Farewell Admin',
          email: defaultEmail,
          password: defaultPassword,
          role: 'superadmin',
        });
        await admin.save();
        console.log(`[Admin Auth] Auto-created default admin on first valid login: ${defaultEmail}`);
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email and password.',
        });
      }
    } else {
      // Admin exists: verify password
      let isMatch = await admin.comparePassword(password);

      // If comparison failed, but credentials match the master env credentials, auto-sync and allow!
      if (!isMatch && normalizedEmail === defaultEmail && password === defaultPassword) {
        admin.password = defaultPassword;
        await admin.save();
        isMatch = true;
        console.log(`[Admin Auth] Auto-synchronized default admin password on login`);
      }

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email and password.',
        });
      }
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token (expires in 7 days)
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('[AuthController.login] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.',
      error: error.message,
    });
  }
};

// Get current admin profile
const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin details',
      error: error.message,
    });
  }
};

module.exports = {
  seedInitialAdmin,
  login,
  getMe,
};
