const partenaireService = require('../services/partenairesService');

module.exports.getAll = async (req, res) => {
  try {
    const partenaire = await partenaireService.getPartenaires();
    res.status(200).json({ partenaire });
  } catch (err) {
    console.error('Error fetching partenaire:', err);
    return null;
  }
};

module.exports.partenaire = async (req, res) => {
  try {
    const partenaire = await partenaireService.getPartenaire(req.params.id);
    if (!partenaire) {
      return res.status(400).json({ message: 'Partenaire not found' });
    }
    res.status(200).json({ partenaire });
  } catch (err) {
    console.error('Error detail partenaire:', err);
    return null;
  }
};

module.exports.register = async (req, res) => {
  try {
    // validation exists partenaire
    let partenaireExists = await partenaireService.existsPartenaires(req.body.name);
    if (partenaireExists) {
      return res.status(409).json({ message: 'Partenaire already exists' });
    }

    const partenaire = await partenaireService.addPartenaires(req.body);
    res.status(201).json({ status: 201, data: partenaire, message: 'Partenaire created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    // validation exists partenaire
    let partenaireExists = await partenaireService.existsPartenaires(req.body.name, req.body._id);
    if (partenaireExists) {
      return res.status(409).json({ message: 'Partenaire already exists' });
    }

    // cree un partenaire

    partenaire = await partenaireService.updatePartenaire(req.body);
    res.status(201).json({ status: 201, data: partenaire, message: 'Partenaire updated successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await partenaireService.deletePartenaire(req.params.id);
    res.status(200).json({ status: 200, message: 'Partenaire deleted successfully' });
  } catch (err) {
    console.error('Error deleting partenaire:', err);
    return null;
  }
};
