const categoryService = require('../services/categoryService');

module.exports.categories = async () => {
    try {
    
        let categories = await categoryService.getCategories();
         res.status(200).json({ categories });
    }
    catch (err) {
        console.error('Error fetching categories:', err);
        return null;
    }
}

module.exports.register = async (req, res) => {
    try {
        // cree un category 
        let category = categoryService(req.body);
        category = await categoryService.createCategory(category);    
        res.status(201).json({status: 201, data: category, message: 'Category created successfully' });
    }
    catch (err) {
       res.status(400).json({ status:400, message: error.message });
    }
}