const UserAuth = require('../models/user');
const bcrypt = require('bcrypt');

// Récupérer un user
module.exports.getUser = async (query) => {
  try {
    let user = await UserAuth.findOne(query).select('_id role password');
    return user;
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
};

// Créer un user
module.exports.createUser = async (userData) => {
  try {
    userData.password = await module.exports.encryptPass(userData.password);
    let user = new UserAuth(userData);
    await user.save();
  } catch (err) {
    console.error('Error creating user:', err);
    return null;
  }
};

// Update Password
module.exports.updatePasswordS = async (id, password) => {
  try {
    password = await module.exports.encryptPass(password);
    await UserAuth.findByIdAndUpdate(id, { $set: { password: password } }, { new: true, runValidators: true });
  } catch (err) {
    console.error('Error updating password:', err);
    return null;
  }
};

module.exports.encryptPass = async (pass) => {
  //hash le mdp avec bcrypt
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

module.exports.existsUsers = async (email, _id) => {
  try {
    if (!email) {
      return await UserAuth.exists();
    }
    if (_id) {
      return await UserAuth.exists({ email: email, _id: { $ne: _id } });
    }
    return await UserAuth.exists({ email: email });
  } catch (err) {
    console.error('Error checking if user exists:', err);
    return false;
  }
};
