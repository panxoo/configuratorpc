const partenaire = require('../models/partenaires');

module.exports.getPartenaires = async () => {
  try {
    return await partenaire.find();
  } catch (err) {
    console.error('Error fetching partenaire:', err);
    return null;
  }
};

module.exports.getPartenaire = async (query) => {
  try {
    return await partenaire.findById(query);
  } catch (err) {
    console.error('Error fetching partenaire:', err);
    return null;
  }
};

module.exports.addPartenaires = async (partenaireData) => {
  try {
    const newPartanaire = new partenaire(partenaireData);
    await newPartanaire.save();
  } catch (err) {
    console.error('Error adding partenaire:', err);
  }
};

module.exports.existsPartenaires = async (name, _id) => {
  try {
    if (!name) {
      return await partenaire.exists();
    }
    if (_id) {
      return await partenaire.exists({ name: name, _id: { $ne: _id } });
    }
    return await partenaire.exists({ name: name });
  } catch (err) {
    console.error('Error checking if partenaires exists:', err);
    return false;
  }
};

module.exports.updatePartenaire = async (partenaireData) => {
  try {
    await partenaire.findByIdAndUpdate(partenaireData._id, partenaireData);
  } catch (err) {
    console.error('Error updating partenaire:', err);
  }
};

module.exports.deletePartenaire = async (id) => {
  try {
    await partenaire.findByIdAndDelete(id);
  } catch (err) {
    console.error('Error deleting partenaire:', err);
  }
};

module.exports.createManyPartenaires = async (partenaireData) => {
  try {
    let newPartenaire = partenaireData.map((par) => new partenaire(par));
    await partenaire.insertMany(newPartenaire);
  } catch (err) {
    console.error('Error creating partenaire:', err);
  }
};
