const userAuthService = require('../services/userAuthService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/user');

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userAuthService.getUser({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // créer un token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    res.status(200).json({ token: token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: error.message });
  }
};

module.exports.register = async (req, res) => {
  try {
    // cree un user
    let user = UserAuth(req.body);
    let userExists = await userAuthService.existsUsers(user.email);
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    user = await userAuthService.createUser(user);
    res.status(201).json({ status: 201, data: user, message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
