const prixCompServ = require('../services/prixComposantService');

module.exports.prixCategoryPartenaire = async (req, res) => {
  try {
    let composant = await prixCompServ.getPrixCategoryPartenaire(req.query.category, req.query.partenaire);
    if (!composant) {
      return res.status(404).json({ message: 'Composant not found' });
    }
    res.status(200).json({ composant });
  } catch (err) {
    console.error('Error fetching composant:', err);
    return null;
  }
};

module.exports.prixComposant = async (req, res) => {
  try {
    let composant = await prixCompServ.getPrixComposant(req.query.composant);
    if (!composant) {
      return res.status(404).json({ message: 'Composant not found' });
    }

    res.status(200).json({ composant });
  } catch (err) {
    console.error('Error fetching composant:', err);
    return null;
  }
};

module.exports.getPrixComposantLowerForCategory = async (req, res) => {
  try {
    let composant = await prixCompServ.getPrixComposantLowerForCategory(req.query.category);
    if (!composant) {
      return res.status(404).json({ message: 'Composant not found' });
    }
    res.status(200).json({ composant });
  } catch (err) {
    console.error('Error fetching composant:', err);
    return null;
  }
};

module.exports.register = async (req, res) => {
  try {
    if (req.body.prix === undefined || req.body.prix === null || req.body.prix <= 0) {
      return res.status(400).json({ message: 'Prix is required' });
    }

    // validation exists prix composant
    let prixCompExists = await prixCompServ.existsPrixComp(req.body.composant, req.body.partenaire);
    if (prixCompExists) {
      return res.status(409).json({ message: 'Prix composant already exists' });
    }

    const prixComp = await prixCompServ.addPrixComp(req.body);
    res.status(201).json({ status: 201, data: prixComp, message: 'Prix composant created successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    if (req.body.prix === undefined || req.body.prix === null || req.body.prix <= 0) {
      return res.status(400).json({ message: 'Prix is required' });
    }

    // validation exists prix composant
    let prixCompExists = await prixCompServ.existsPrixCompByID(req.body._id);
    if (!prixCompExists) {
      return res.status(409).json({ message: 'Prix composant not exists' });
    }

    // update un prix composant

    prixComp = await prixCompServ.updatePrix(req.body);
    res.status(201).json({ status: 201, message: 'Prix composant updated successfully' });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    await prixCompServ.deletePrixComp(req.params.id);
    res.status(200).json({ status: 200, message: 'Prix composant deleted successfully' });
  } catch (err) {
    console.error('Error deleting prix composant:', err);
    return null;
  }
};
