const composant = require('../models/composants');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// This service lists all composants or filters them by category.
module.exports.getComposants = async (query) => {
  try {
    if (query) {
      return await composant.find({ category: query }).populate('category', 'name').populate('marque', 'name');
    } else {
      return await composant.find().populate('category', 'name').populate('marque', 'name');
    }
  } catch (err) {
    console.error('Error fetching composants:', err);
    return null;
  }
};

// this service details a specific composant by its ID.
module.exports.getComposant = async (query) => {
  try {
    return await composant.findById(query).populate('category', 'name').populate('marque', 'name');
  } catch (err) {
    console.error('Error fetching composant:', err);
    return null;
  }
};

// This service adds a new composant to the database.
module.exports.addComposant = async (composantData) => {
  try {
    const newCategory = composantData.category._id ? composantData.category._id : composantData.category;
    const newMarque = composantData.marque._id ? composantData.marque._id : composantData.marque;
    const parseData = { ...composantData, category: newCategory, marque: newMarque, _id: new ObjectId() };
    const newComposant = new composant(parseData);
    await newComposant.save();
  } catch (err) {
    console.error('Error adding composant:', err);
  }
};

// This service checks if a composant with the given title already exists, optionally excluding a specific ID.
module.exports.existsComposant = async (titre, _id) => {
  try {
    if (_id) {
      return await composant.exists({ titre: titre, _id: { $ne: _id } });
    }
    return await composant.exists({ titre: titre });
  } catch (err) {
    console.error('Error checking if composant exists:', err);
    return false;
  }
};

// This service updates an existing composant with new data.
module.exports.updateComposant = async (composantData) => {
  try {
    await composant.findByIdAndUpdate(composantData._id, composantData);
  } catch (err) {
    console.error('Error updating composant:', err);
  }
};

// This service deletes a composant by its ID.
module.exports.deleteComposant = async (id) => {
  try {
    await composant.findByIdAndDelete(id);
  } catch (err) {
    console.error('Error deleting composant:', err);
  }
};
