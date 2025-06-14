const parametreService = require('../services/parametreService');
const Category = require('../models/category');
const Marque = require('../models/marque');

// CONTROLLER CATEGORIES

module.exports.categories = async (req, res) => {
  try {
    let categories = await parametreService.getCategories();
    res.status(200).json({ categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    return null;
  }
};

module.exports.addCategories = async (req, res) => {
  try {
    // validation exists category
    let categoryExists = await parametreService.existsCategory(req.body.name);
    if (categoryExists) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    // cree un category
    let category = Category(req.body);
    category = await parametreService.createCategory(category);
    res.status(201).json({ status: 201, data: category, message: 'Category created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.updateCategories = async (req, res) => {
  try {
    // validation exists category
    let categoryExists = await parametreService.existsCategory(req.body.name, req.body._id);
    if (categoryExists) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    // update un category
    category = await parametreService.updateCategory(req.body);
    res.status(201).json({ status: 201, data: category, message: 'Category update successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

// CONTROLLER MARQUES

module.exports.marques = async (req, res) => {
  try {
    let marques = await parametreService.getMarques();
    res.status(200).json({ marques });
  } catch (err) {
    console.error('Error fetching marques:', err);
    return null;
  }
};

module.exports.addMarques = async (req, res) => {
  try {
    // validation exists marque
    let marqueExists = await parametreService.existsMarque(req.body.name);
    if (marqueExists) {
      return res.status(409).json({ message: 'Marque already exists' });
    }

    // cree un marque
    let marque = Marque(req.body);
    marque = await parametreService.createMarques(marque);
    res.status(201).json({ status: 201, data: marque, message: 'Marque created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.updateMarques = async (req, res) => {
  try {
    // validation exists marque
    let marqueExists = await parametreService.existsMarque(req.body.name, req.body._id);
    if (marqueExists) {
      return res.status(409).json({ message: 'Marque already exists' });
    }

    // update un marque
    marque = await parametreService.updateMarque(req.body);
    res.status(201).json({ status: 201, data: marque, message: 'Marque update successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
