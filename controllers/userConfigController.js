const userConfigService = require('../services/userConfigService');

module.exports.getAllConfig = async (req, res) => {
  try {
    const configs = await userConfigService.getuserConfigs(req.params.user);
    res.status(200).json({ configs });
  } catch (err) {
    console.error('Error fetching config:', err);
    return null;
  }
};

module.exports.getConfig = async (req, res) => {
  try {
    const config = await userConfigService.getuserConfigDetaille(req.params.user, req.params.id);
    res.status(200).json({ config });
  } catch (err) {
    console.error('Error detail config:', err);
    return null;
  }
};

module.exports.register = async (req, res) => {
  try {
    // validation exists config
    let configExists = await userConfigService.existsuserConfig(req.body.name, req.body.user);
    if (configExists) {
      return res.status(409).json({ message: 'config already exists' });
    }

    const config = await userConfigService.adduserConfig(req.body);
    res.status(201).json({ status: 201, data: config, message: 'config created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    // validation exists config
    let configExists = await userConfigService.configExists(req.body.name, req.body.user, req.body._id);
    if (configExists) {
      return res.status(409).json({ message: 'config already exists' });
    }

    // cree un config

    config = await userConfigService.updateUser(req.body);
    res.status(201).json({ status: 201, data: config, message: 'config updated successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await userConfigService.deleteConfig(req.params.id);
    res.status(200).json({ status: 200, message: 'config deleted successfully' });
  } catch (err) {
    console.error('Error deleting config:', err);
    return null;
  }
};
