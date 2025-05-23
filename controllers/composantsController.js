const composantsService = require('../services/composantsService');
const Composant = require('../models/composants');

module.exports.composants = async (req, res) => {
    try {
        let composants = await composantsService.getComposants(req.query.category);
        res.status(200).json({ composants });
    } catch (err) {
        console.error('Error fetching composants:', err);
        return null;
    }
}

module.exports.composant = async (req, res) => {
    try {
        let composant = await composantsService.getComposant({_id: req.params.id});
        res.status(200).json({ composant });
    } catch (err) {
        console.error('Error fetching composant:', err);
        return null;
    }
}

module.exports.register = async (req, res) => {
    try {
        // validation exists composant
        let composantExists = await composantsService.existsComposant(req.body.name);
        if (composantExists) {
            return res.status(409).json({ message: 'Composant already exists' });
        }

        // cree un composant 
        let composant = Composant(req.body);
        composant = await composantsService.addComposant(composant);    
        res.status(201).json({status: 201, data: composant, message: 'Composant created successfully' });
    } catch (err) {
       res.status(400).json({ status:400, message: error.message });
    }
}


module.exports.update = async (req, res) => {
    try {
        // validation exists composant
        let composantExists = await composantsService.existsComposant(req.body.name, req.body._id);
        if (composantExists) {
            return res.status(409).json({ message: 'Composant already exists' });
        }

        // cree un composant 
        let composant = Composant(req.body);
        composant = await composantsService.updateComposant(composant);    
        res.status(201).json({status: 201, data: composant, message: 'Composant created successfully' });
    } catch (err) {
       res.status(400).json({ status:400, message: error.message });
    }
}

module.exports.delete = async (req, res) => {
    try {
        await composantsService.deleteComposant(req.params.id);
        res.status(200).json({ status: 200, message: 'Composant deleted successfully' });
    } catch (err) {
        console.error('Error deleting composant:', err);
        return null;
    }
}