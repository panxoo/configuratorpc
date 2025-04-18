const composant = require('../models/composantModel');

module.exports.getComposants = async (query) => {
    try {
        let composants = await composant.find({ category: query });
        return composants;
    } catch (err) {
        console.error('Error fetching composants:', err);
        return null;
    }
}