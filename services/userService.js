const user = require('../models/user');

module.exports.getUsers = async () => {
  try {
    return await user.find().select('name last_name email role createdAt');
  } catch (err) {
    console.error('Error fetching users:', err);
    return null;
  }
};

module.exports.getUser = async (query) => {
  try {
    return await user.findById(query).select('name last_name birthday email phone address role createdAt');
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
};

module.exports.updateUser = async (id, userData) => {
  try {
    await user.findByIdAndUpdate(id, { $set: userData }, { new: true, runValidators: true });
  } catch (err) {
    console.error('Error updating user:', err);
  }
};

module.exports.deleteUser = async (id) => {
  try {
    await user.findByIdAndDelete(id);
  } catch (err) {
    console.error('Error deleting user:', err);
  }
};
