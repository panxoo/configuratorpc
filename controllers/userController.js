const userService = require('../services/userService');
const userAuthService = require('../services/userAuthService');

module.exports.getAll = async (req, res) => {
  try {
    const user = await userService.getUsers();
    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
};

module.exports.user = async (req, res) => {
  try {
    const userid = req.role === 'admin' ? (req.query.id ? req.query.id : req.user) : req.user;
    const user = await userService.getUser(userid);
    res.status(200).json({ user });
  } catch (err) {
    console.error('Error detail user:', err);
    return null;
  }
};

module.exports.update = async (req, res) => {
  try {
    // cree un user
    const allowedUpdates = ['name', 'last_name', 'birthday', 'phone', 'address'];
    const updates = req.body;
    const filteredUpdates = {};

    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key];
      }
    }

    user = await userService.updateUser(req.user, filteredUpdates);
    res.status(201).json({ status: 201, data: user, message: 'user updated successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    // update un user
    await userAuthService.updatePasswordS(req.user, req.body.password);
    res.status(201).json({ status: 201, message: 'user updated successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const userid = req.role === 'admin' ? (req.params.id ? req.params.id : req.user) : req.user;

    await userService.deleteUser(userid);
    res.status(200).json({ status: 200, message: 'user deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    return null;
  }
};
