const userService = require('../services/userService');

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
    const user = await userService.getUser(req.params.id);
    res.status(200).json({ user });
  } catch (err) {
    console.error('Error detail user:', err);
    return null;
  }
};

module.exports.register = async (req, res) => {
  try {
    // validation exists user
    let userExists = await userService.existsUsers(req.body.email, req.body.username);
    if (userExists) {
      return res.status(409).json({ message: 'user already exists' });
    }

    const user = await userService.addUser(req.body);
    res.status(201).json({ status: 201, data: user, message: 'user created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    // validation exists user
    let userExists = await userService.existsUsers(req.body.email, req.body.username, req.body._id);
    if (userExists) {
      return res.status(409).json({ message: 'user already exists' });
    }

    // cree un user

    user = await userService.updateUser(req.body);
    res.status(201).json({ status: 201, data: user, message: 'user updated successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ status: 200, message: 'user deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    return null;
  }
};
