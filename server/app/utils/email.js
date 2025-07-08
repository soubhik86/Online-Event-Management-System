const transporter = require("../config/emailConfig");
const otpVerifyModel = require("../model/Otpmodel");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

// ✅ Generic email sending function (with optional attachments)
const sendEmail = async (to, subject, html, attachments = []) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    attachments,
  });
};

// ✅ Send Email Verification OTP (QRio branded)
const sendEmailVerificationOTP = async (req, user) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await new otpVerifyModel({
    user: user._id,
    otp,
    purpose: "email-verification",
  }).save();

  const html = `
  <div style="background-color:#f9f9f9; padding: 40px; font-family: Arial, sans-serif;">
    <div style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; padding:30px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
      <div style="text-align:center; margin-bottom:20px;">
        <h1 style="color:#0066cc; font-size:28px; margin:0;"><span style="font-weight:bold; color:#222;">QRio</span></h1>
        <h2 style="color:#0066cc;">Welcome to QRio 🎉</h2>
      </div>
      <p style="font-size:16px; color:#444;">Hi <strong>${user.name}</strong>,</p>
      <p style="font-size:16px; color:#444;">
        Thank you for registering with QRio! Please verify your email using the OTP below:
      </p>
      <div style="margin:20px 0; padding:15px; background-color:#f0f4ff; border-left:6px solid #0066cc; font-size:24px; font-weight:bold; color:#0066cc; text-align:center; letter-spacing:3px;">
        ${otp}
      </div>
      <p style="font-size:15px; color:#666;">This OTP is valid for <strong>15 minutes</strong>. If you didn’t request this, you can safely ignore this email.</p>
      <p style="margin-top:40px; font-size:14px; color:#999;">— The QRio Team</p>
    </div>
  </div>
  `;

  await sendEmail(user.email, "OTP - Verify your account", html);
  return otp;
};

// ✅ Send Password Reset OTP (QRio branded)
const sendPasswordResetOTP = async (req, user) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await new otpVerifyModel({
    user: user._id,
    otp,
    purpose: "password-reset",
  }).save();

  const html = `
  <div style="background-color:#f9f9f9; padding: 40px; font-family: Arial, sans-serif;">
    <div style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; padding:30px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
      <div style="text-align:center; margin-bottom:20px;">
        <h1 style="color:#cc3300; font-size:28px; margin:0;"><span style="font-weight:bold; color:#222;">QRio</span></h1>
        <h2 style="color:#cc3300;">Reset Your QRio Password</h2>
      </div>
      <p style="font-size:16px; color:#444;">Hi <strong>${user.name}</strong>,</p>
      <p style="font-size:16px; color:#444;">
        You requested to reset your QRio account password. Use the OTP below to proceed:
      </p>
      <div style="margin:20px 0; padding:15px; background-color:#fff4f0; border-left:6px solid #ff6600; font-size:24px; font-weight:bold; color:#cc3300; text-align:center; letter-spacing:3px;">
        ${otp}
      </div>
      <p style="font-size:15px; color:#666;">This OTP is valid for <strong>15 minutes</strong>. If you didn’t request this, you can safely ignore this email.</p>
      <p style="margin-top:40px; font-size:14px; color:#999;">— The QRio Team</p>
    </div>
  </div>
  `;

  await sendEmail(user.email, "QRio - Password Reset OTP", html);
  return otp;
};

// ✅ Send Ticket Email with QR Code (QRio branded)
const sendTicketEmail = async (user, event, ticketId) => {
  const qrData = `Ticket ID: ${ticketId}\nName: ${user.name}\nEvent: ${event.title}\nDate: ${event.date}`;
  const qrImagePath = path.join(__dirname, `../qrcodes/${ticketId}.png`);

  fs.mkdirSync(path.dirname(qrImagePath), { recursive: true });
  await QRCode.toFile(qrImagePath, qrData);

  const qrCID = `${ticketId}@qr.qrio`;

  const html = `
  <div style="font-family: Arial, sans-serif; padding: 40px; background-color: #f2f2f2;">
    <div style="background: white; max-width: 600px; margin: auto; padding: 30px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color:#0066cc; font-size:28px; margin:0;"><span style="font-weight:bold; color:#222;">QRio</span></h1>
        <h2 style="color: #0066cc;">🎟️ Your QRio Ticket</h2>
      </div>
      <p>Hi <strong>${user.name}</strong>,</p>
      <p>Thank you for registering for <strong>${event.title}</strong>!</p>
      <p><strong>Event:</strong> ${event.title}<br/>
         <strong>Date:</strong> ${new Date(event.date).toDateString()}<br/>
         <strong>Location:</strong> ${event.location}<br/>
         <strong>Ticket ID:</strong> <span style="color:#0066cc;">${ticketId}</span></p>
      <div style="margin-top:20px; text-align:center;">
        <img src="cid:${qrCID}" alt="QR Code" style="width:200px; height:200px;" />
        <p style="font-size: 12px; color: #666;">Show this QR code at the event entrance.</p>
      </div>
      <p style="text-align:center; margin-top: 20px;">
        <a href="${process.env.BASE_URL}/ticket/download/${ticketId}"
           style="display:inline-block; padding:10px 20px; background-color:#0066cc; color:#fff; border-radius:5px; text-decoration:none;">
          📥 Download Ticket QR
        </a>
      </p>
      <p style="margin-top: 30px; font-size: 14px; color: #777;">— The QRio Team</p>
    </div>
  </div>
  `;

  await sendEmail(user.email, `Your Ticket for ${event.title}`, html, [
    {
      filename: `${ticketId}.png`,
      path: qrImagePath,
      cid: qrCID,
    }
  ]);
};

// ✅ Export all utilities
module.exports = {
  sendEmail,
  sendEmailVerificationOTP,
  sendPasswordResetOTP,
  sendTicketEmail,
};
