const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

// Hash password
const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password with hash
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// ✅ Authenticate user via JWT from cookie or header
const authenticateUser = async (req, res, next) => {
  try {
    // ✅ Support token from cookie or Authorization header
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Authorize specific roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
};



const AuthCheck = async (req, res, next) => {
  try {
    const token = req.cookies?.userToken;

    if (!token) return next(); // No token, continue without user

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return next();

    req.user = user; // attach full user
    next();
  } catch (err) {
    console.log("AuthCheck error:", err);
    next(); // continue even if token is invalid
  }
};


module.exports = {
  hashedPassword,
  comparePassword,
  authenticateUser,
  authorizeRoles,
  AuthCheck
};
