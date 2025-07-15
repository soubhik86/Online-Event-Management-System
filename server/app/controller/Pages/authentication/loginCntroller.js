const User = require('../../../model/User');
const { comparePassword } = require('../../../middleware/AuthMiddleware');
const createToken = require('../../../helper/createToken');

class LoginController {
  // GET: Show login page
  async loginView(req, res) {
    try {
      res.render('login', { title: 'Login' });
    } catch (error) {
      console.log('Render error:', error);
      res.status(500).send('Failed to load login page');
    }
  }

  // POST: Handle login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // ✅ Validate input
      if (!email || !password) {
        return res.status(400).send('Email and password are required.');
      }

      // ✅ Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        console.log('Invalid email');
        return res.redirect('/login');
      }

      // ✅ Compare password
      const isMatched = await comparePassword(password, user.password);
      if (!isMatched) {
        console.log('Invalid password');
        return res.redirect('/login');
      }

      // ✅ Create JWT token and store in cookie
      const token = createToken(user);
      res.cookie('userToken', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 hour
      });

      // ✅ Redirect to dashboard
      return res.redirect('/');
    } catch (error) {
      console.log('Login error:', error);
      return res.status(500).send('Login failed.');
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie('userToken');
      res.redirect('/login');
    } catch (error) {
      console.log('Logout error:', error);
      res.status(500).send('Logout failed.');
    }
  }
}

module.exports = new LoginController(); 