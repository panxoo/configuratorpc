const category = require('../models/category');
const marque = require('../models/marque');

// PARAMETRE CATÉGORIE

module.exports.getCategories = async () => {
  try {
    let categories = await category.find().select('_id name');
    return categories;
  } catch (err) {
    console.error('Error fetching categories:', err);
    return null;
  }
};

module.exports.createCategory = async (categoryData) => {
  try {
    let newCategory = new category(categoryData);
    await newCategory.save();
  } catch (err) {
    console.error('Error creating category:', err);
    return null;
  }
};

module.exports.createManyCategory = async (categoryData) => {
  try {
    let newCategories = categoryData.map((cat) => new category(cat));
    await category.insertMany(newCategories);
  } catch (err) {
    console.error('Error creating category:', err);
  }
};

module.exports.existsCategory = async (name, _id) => {
  try {
    if (!name) return await category.exists();
    else {
      if (_id) {
        return await category.exists({ name: name, _id: { $ne: _id } });
      } else {
        return await category.exists({ name: name });
      }
    }
  } catch (err) {
    console.error('Error checking if categories exist:', err);
    return null;
  }
};

module.exports.updateCategory = async (categoryData) => {
  try {
    await category.findByIdAndUpdate(categoryData._id, categoryData);
  } catch (err) {
    console.error('Error updating category:', err);
    return null;
  }
};

// PARAMETRE MARQUE

module.exports.getMarques = async () => {
  try {
    return await marque.find().select('_id name');
  } catch (err) {
    console.error('Error fetching marques:', err);
  }
};

module.exports.createMarques = async (marqueData) => {
  try {
    let newMarque = new marque(marqueData);
    await newMarque.save();
  } catch (err) {
    console.error('Error creating marque:', err);
    return null;
  }
};

module.exports.createManyMarque = async (marqueData) => {
  try {
    let newMarque = marqueData.map((cat) => new marque(cat));
    await marque.insertMany(newMarque);
  } catch (err) {
    console.error('Error creating marque:', err);
  }
};

module.exports.existsMarque = async (name, _id) => {
  try {
    if (!name) return await marque.exists();
    else {
      if (_id) {
        return await marque.exists({ name: name, _id: { $ne: _id } });
      } else {
        return await marque.exists({ name: name });
      }
    }
  } catch (err) {
    console.error('Error checking if marque exist:', err);
    return null;
  }
};

module.exports.updateMarque = async (marqueData) => {
  try {
    await marque.findByIdAndUpdate(marqueData._id, marqueData);
  } catch (err) {
    console.error('Error updating marque:', err);
    return null;
  }
};
