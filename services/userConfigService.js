const userConfig = require('../models/userConfig');

module.exports.getuserConfigs = async (userid) => {
  try {
    return await userConfig.find({ user: userid }).select('name dateCreated dateUpdated');
  } catch (err) {
    console.error('Error fetching user Config:', err);
    return null;
  }
};

module.exports.getuserConfigDetaille = async (user, _id) => {
  try {
    return await userConfig
      .findOne({ user: user, _id: _id })
      .select('name dateCreated dateUpdated composants.quantity composants.prixComposant')
      .populate({
        path: 'composants.prixComposant',
        select: 'prix partenaire composant',
        populate: [
          {
            path: 'composant',
            select: 'titre category marque',
            populate: [
              { path: 'category', select: 'name' },
              { path: 'marque', select: 'name' },
            ],
          },
          {
            path: 'partenaire',
            select: 'name',
          },
        ],
      });
  } catch (err) {
    console.error('Error fetching Config:', err);
    return null;
  }
};

module.exports.adduserConfig = async (userConfigData) => {
  try {
    const newConfig = new userConfig(userConfigData);
    await newConfig.save();
  } catch (err) {
    console.error('Error adding Config:', err);
  }
};

module.exports.existsuserConfig = async (name, user, _id) => {
  try {
    if (_id) {
      console.log('Checking if config exists with name:', name, 'for user:', user, 'excluding id:', _id);
      return await userConfig.exists({ name: name, user: user, _id: { $ne: _id } });
    }
    return await userConfig.exists({ name: name, user: user });
  } catch (err) {
    console.error('Error checking if Config exists:', err);
    return false;
  }
};

module.exports.updateuserConfig = async (userConfigData) => {
  try {
    await userConfig.findByIdAndUpdate(userConfigData.id, userConfigData);
  } catch (err) {
    console.error('Error updating userConfig:', err);
  }
};

module.exports.deleteuserConfig = async (id, user) => {
  try {
    await userConfig.find({ _id: id, user: user }).deleteOne();
  } catch (err) {
    console.error('Error deleting userConfig:', err);
  }
};
