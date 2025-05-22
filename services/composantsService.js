const composant = require('../models/composants');

module.exports.getComposants = async (query) => {
    try {
        if (query)
            return await composant.find({ category: query }).select('titre modele').populate('category', 'name').populate('marque', 'name');
        else
            return await composant.find().select('titre modele').populate('category', 'name').populate('marque', 'name'); 

    } catch (err) {
        console.error('Error fetching composants:', err);
        return null;
    }
}

module.exports.getComposant = async (query) => {
    try {
        return await composant.findOne(query).populate('category', 'name').populate('marque', 'name');
    } catch (err) {
        console.error('Error fetching composant:', err);
        return null;
    }
}

module.exports.addComposant = async (composantData) => {
    try {
        const newComposant = new composant(composantData);
        await newComposant.save();
    } catch (err) {
        console.error('Error adding composant:', err);
    }
}

module.exports.existsComposant = async (name, _id) => {
    try {
        if (_id)
            return await composant.exists({ name: name, _id: { $ne: _id } });        
        return await composant.exists({ name: name });
    } catch (err) {
        console.error('Error checking if composant exists:', err);
        return false;
    }
}

module.exports.updateComposant = async (composantData) => {
    try {
        await composant.findByIdAndUpdate(composantData._id, composantData);
    }
    catch (err) {
        console.error('Error updating composant:', err);
    }
}

module.exports.deleteComposant = async (id) => {
    try {
        await composant.findByIdAndDelete(id);
    } catch (err) {
        console.error('Error deleting composant:', err);
    }
}