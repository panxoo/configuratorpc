const category = require('../models/categoryModel');


module.exports.getCategories = async () => {
    try {
        let categories = await category.find().select('_id name');
        return categories;
    }
    catch (err) {
        console.error('Error fetching categories:', err);
        return null;
    }
}

module.exports.createCategory = async (categoryData) => {
    try {
        let newCategory = new category(categoryData);
        await newCategory.save();
    }
    catch (err) {
        console.error('Error creating category:', err);
        return null;
    }
}