const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const dbConnect = require("./app/config/db");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const flash = require('connect-flash');
const swaggerUi = require('swagger-ui-express'); // ✅ Move up
const YAML = require('yamljs');                 // ✅ Move up

const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml")); // ✅ Now safe to use

dotenv.config();
dbConnect();

// ✅ View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Sessions
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// ✅ Flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// ✅ Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Routes
const authRoutes = require("./app/router/authRoutes");
const eventRoutes = require("./app/router/eventRoutes");
const eventRoutesUser = require("./app/router/eventControllerUser");
const registrationRoutes = require("./app/router/registrationRoutes");
const ticketRoutes = require("./app/router/ticketRoutes");
const router = require("./app/router/routing");
const blogRoutes = require("./app/router/blogRoutes");

app.use(authRoutes);
app.use('/admin/events', eventRoutes);
app.use(eventRoutesUser);
app.use(registrationRoutes);
app.use(ticketRoutes);
app.use(router);
app.use(blogRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});


// test