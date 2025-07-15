// models/Otpmodel.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
  purpose: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 900 } 
});

module.exports = mongoose.model('EmailVerify', otpSchema);
