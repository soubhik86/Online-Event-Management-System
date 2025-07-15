const User = require('../model/User');
const EmailVerifyModel = require('../model/Otpmodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  sendEmailVerificationOTP,
  sendPasswordResetOTP,
} = require('../utils/email');

class AuthController {
  // ✅ Register User + Send Email Verification OTP
  async register(req, res) {
    try {
      const { name, email, phone, password, role } = req.body;
      const profilePicture = req.file ? req.file.filename : null;

      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: 'Email already registered' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        profilePicture,
        isVerified: false,
      });

      await user.save();
      await sendEmailVerificationOTP(req, user);

      res.status(201).json({
        message: 'User registered. OTP sent to email.',
        userId: user._id,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ✅ Verify Email
  async verifyEmail(req, res) {
    try {
      const { otp } = req.body;

      if (!otp)
        return res.status(400).json({ message: 'OTP is required' });

      const otpRecord = await EmailVerifyModel.findOne({
        otp,
        purpose: 'email-verification',
      });

      if (!otpRecord)
        return res.status(400).json({ message: 'Invalid or expired OTP' });

      const user = await User.findById(otpRecord.user);
      if (!user)
        return res.status(404).json({ message: 'User not found' });

      if (user.isVerified)
        return res.status(400).json({ message: 'Email already verified' });

      user.isVerified = true;
      await user.save();

      await EmailVerifyModel.deleteMany({
        user: user._id,
        purpose: 'email-verification',
      });

      res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ✅ Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials' });

      if (!user.isVerified) {
        return res.status(401).json({
          message: 'Please verify your email before login',
        });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ✅ Dashboard
  async dashboard(req, res) {
    try {
      const user = req.user;
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ✅ Update Profile
  async updateProfile(req, res) {
    try {
      const { name, phone } = req.body;
      const profilePicture = req.file
        ? req.file.filename
        : req.user.profilePicture;

      const user = await User.findById(req.user._id);
      if (!user)
        return res.status(404).json({ message: 'User not found' });

      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.profilePicture = profilePicture;

      await user.save();

      res
        .status(200)
        .json({ message: 'Profile updated successfully', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ✅ Forgot Password (send OTP)
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      if (!email)
        return res.status(400).json({ message: 'Email is required' });

      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ message: 'User not found' });

      await sendPasswordResetOTP(req, user); // purpose = 'password-reset'

      res.status(200).json({
        message: 'OTP sent to your email for password reset',
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ✅ Reset Password with OTP
  // ✅ Reset Password using only OTP and new password
async resetPassword(req, res) {
  try {
    const { otp, newPassword } = req.body;

    if (!otp || !newPassword) {
      return res
        .status(400)
        .json({ message: 'OTP and new password are required' });
    }

    // Find OTP record
    const otpRecord = await EmailVerifyModel.findOne({
      otp,
      purpose: 'password-reset',
    });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Find user by OTP's user ID
    const user = await User.findById(otpRecord.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Delete all OTPs for this user
    await EmailVerifyModel.deleteMany({
      user: user._id,
      purpose: 'password-reset',
    });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


  async updateProfile(req, res) {
    try {
      const { name, phone } = req.body;
      const profilePicture = req.file
        ? req.file.filename
        : req.user.profilePicture;
  
      const user = await User.findById(req.user._id);
      if (!user)
        return res.status(404).json({ message: 'User not found' });
  
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.profilePicture = profilePicture;
  
      await user.save();
  
      res
        .status(200)
        .json({ message: 'Profile updated successfully', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
