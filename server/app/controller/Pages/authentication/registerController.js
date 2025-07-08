const User = require('../../../model/User');
const { hashedPassword } = require('../../../middleware/AuthMiddleware');

class RegisterController {
  // Render register page
  async registerView(req, res) {
    try {
      res.render('register', { title: 'Register' });
    } catch (error) {
      console.log(error);
      res.status(500).send('Failed to load register page');
    }
  }

  // Handle registration
  async register(req, res) {
    try {
      const { name, email, phone, password, role, profilePicture } = req.body;

      // Basic validation
      if (!name || !email || !phone || !password || !role) {
        return res.status(400).send('All fields are required.');
      }

      // Check for existing user by email or phone
      const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
      if (existingUser) {
        return res.status(409).send('User already exists with this email or phone number.');
      }

      const hashed = await hashedPassword(password);

      const newUser = new User({
        name,
        email,
        phone,
        password: hashed,
        role,
        profilePicture: profilePicture || 'default-profile.png',
      });

      await newUser.save();

      res.redirect('/login');
    } catch (error) {
      console.log('Register error:', error);
      res.status(500).send('Registration failed.');
    }
  }
}

module.exports = new RegisterController();
