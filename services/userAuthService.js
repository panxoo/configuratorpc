const UserAuth = require('../models/user');

// Récupérer un user
module.exports.getUser = async (query) => {
  try {
    let user = await UserAuth.findOne(query);
    return user;
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
};

// Créer un user
module.exports.createUser = async (userData) => {
  try {
    let user = new UserAuth(userData);
    await user.save();
  } catch (err) {
    console.error('Error creating user:', err);
    return null;
  }
};
