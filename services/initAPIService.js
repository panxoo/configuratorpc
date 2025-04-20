const categoryService = require('./parametreService');

module.exports.addCategoryInitialData = async () => {
    try {
        
        let existsCat = await categoryService.existsCategory();
        if (existsCat) {
            console.log('Categories already exist, no need to add initial data.');
            return;
        }
             let initialCategories = [
                { name: 'Electronics' },
                { name: 'Books' },
                { name: 'Clothing' },
                { name: 'Home & Kitchen' },
                { name: 'Beauty & Personal Care' }
            ];
            await categoryService.createManyCategory(initialCategories);
            console.log('Initial categories added successfully!');
        
    } catch (err) {
        console.error('Error adding initial categories:', err);
    }
}