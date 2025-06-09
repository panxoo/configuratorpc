const composantsService = require('../services/composantsService');

// List Composants
module.exports.composants = async (req, res) => {
  try {
    let composants = await composantsService.getComposants(req.query.category);
    res.status(200).json({ composants });
  } catch (err) {
    console.error('Error fetching composants:', err);
    return null;
  }
};

// Detail Composant
module.exports.composant = async (req, res) => {
  try {
    let composant = await composantsService.getComposant(req.params.id);
    if (!composant) {
      return res.status(404).json({ message: 'Composant not found' });
    }

    //convert image data to base64 if it exists

    const image = composant.image ? `data:${composant.image.contentType};base64,${composant.image.data.toString('base64')}` : null;

    res.status(200).json({ ...composant.toObject(), image });
  } catch (err) {
    console.error('Error fetching composant:', err);
    return null;
  }
};

// Register Composant
module.exports.register = async (req, res) => {
  try {
    // validation exists composant
    let composantExists = await composantsService.existsComposant(req.body.titre);
    if (composantExists) {
      return res.status(409).json({ message: 'Composant already exists' });
    }

    // cree un composant
    const composantData = {
      ...req.body,
      image: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined,
    };

    const composant = await composantsService.addComposant(composantData);
    res.status(201).json({ status: 201, data: composant, message: 'Composant created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

// Update Composant
module.exports.update = async (req, res) => {
  try {
    // validation exists composant
    let composantExists = await composantsService.existsComposant(req.body.titre, req.body._id);
    if (composantExists) {
      return res.status(409).json({ message: 'Composant already exists' });
    }

    // cree un composant
    const composantData = {
      ...req.body,
      image: req.file ? { data: req.file.buffer, contentType: req.file.mimetype } : undefined,
    };

    composant = await composantsService.updateComposant(composantData);
    res.status(201).json({ status: 201, data: composant, message: 'Composant created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

// Delete Composant
module.exports.delete = async (req, res) => {
  try {
    await composantsService.deleteComposant(req.params.id);
    res.status(200).json({ status: 200, message: 'Composant deleted successfully' });
  } catch (err) {
    console.error('Error deleting composant:', err);
    return null;
  }
};
