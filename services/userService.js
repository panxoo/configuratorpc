const user = require('../models/user');

module.exports.getUsers = async () => {
  try {
    return await user.find().select('name lastname email username role createdAt');
  } catch (err) {
    console.error('Error fetching users:', err);
    return null;
  }
};

module.exports.getUser = async (query) => {
  try {
    return await user.findById(query);
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
};

module.exports.addUser = async (userData) => {
  try {
    const newUser = new user(userData);
    await newUser.save();
  } catch (err) {
    console.error('Error adding user:', err);
  }
};

module.exports.existsUsers = async (email, username, _id) => {
  try {
    if (_id) {
      return await user.exists({
        $and: [
          {
            $or: [{ email: email }, { username: username }],
          },
          { _id: { $ne: _id } },
        ],
      });
    }
    return await user.exists({
      $or: [{ email: email }, { username: username }],
    });
  } catch (err) {
    console.error('Error checking if user exists:', err);
    return false;
  }
};

module.exports.updateUser = async (userData) => {
  try {
    await partenaire.findByIdAndUpdate(userData._id, userData);
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
