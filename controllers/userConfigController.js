const userConfigService = require('../services/userConfigService');

module.exports.getAllConfig = async (req, res) => {
  try {
    user = req.role === 'admin' ? (req.query.user ? req.query.user : req.user) : req.user;

    const configs = await userConfigService.getuserConfigs(user);
    res.status(200).json({ configs });
  } catch (err) {
    console.error('Error fetching config:', err);
    return null;
  }
};

module.exports.getConfig = async (req, res) => {
  try {
    user = req.role === 'admin' ? (req.query.user ? req.query.user : req.user) : req.user;

    const config = await userConfigService.getuserConfigDetaille(user, req.params.id);
    res.status(200).json({ config });
  } catch (err) {
    console.error('Error detail config:', err);
    return null;
  }
};

module.exports.register = async (req, res) => {
  try {
    const data = req.body;
    data.user = req.user;
    // validation exists config
    let configExists = await userConfigService.existsuserConfig(data.name, data.user);
    if (configExists) {
      return res.status(409).json({ message: 'config already exists' });
    }

    const config = await userConfigService.adduserConfig(data);
    res.status(201).json({ status: 201, data: config, message: 'config created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    const data = req.body;
    const config = await userConfigService.updateuserConfig(data);
    res.status(201).json({ status: 201, data: config, message: 'config updated successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await userConfigService.deleteuserConfig(req.params.id, req.user);
    res.status(200).json({ status: 200, message: 'config deleted successfully' });
  } catch (err) {
    console.error('Error deleting config:', err);
    return null;
  }
};
