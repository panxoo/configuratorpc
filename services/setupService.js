const categoryService = require('./parametreService');

const addMarqueInitialData = async () => {
    try {
        let existsMarque = await categoryService.existsMarque();
        if (existsMarque) {
            console.log('Marques already exist, no need to add initial data.');
            return;
        }
        let initialMarques = [
            { name: 'Samsung' },
            { name: 'Apple' },
            { name: 'Sony' },
            { name: 'LG' },
            { name: 'Dell' }
        ];
        await categoryService.createManyMarque(initialMarques);
        
            console.log('Initial Marques added successfully!');
        
    } catch (err) {
        console.error('Error adding initial Marques:', err);
    }
}

const addCategoryInitialData = async () => {
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


module.exports.setupInitialData = async () => {
    await addCategoryInitialData();
    await addMarqueInitialData();
}

