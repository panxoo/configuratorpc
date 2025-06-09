const prixComposant = require('../models/prixComposant');
const composants = require('../models/composants');

module.exports.getPrixComposant = async (query) => {
  try {
    return await prixComposant.find({ composant: query }).populate('composants', 'titre').populate('partenaire', 'name url');
  } catch (err) {
    console.error('Error fetching composants:', err);
    return null;
  }
};

module.exports.getPrixCategoryPartenaire = async (category, partenaire) => {
  try {
    if (!category || !partenaire) {
      console.error('Category or partenaire is missing');
      return null;
    }

    const composantList = await composants.find({ category: category }).select('_id titre');

    if (!composantList || composantList.length === 0) {
      return null;
    }

    const prix = await prixComposant.find({ composant: { $in: composantList.map((c) => c._id) }, partenaire: partenaire });

    const response = composantList.map((comp) => {
      const prixEntry = prix.find((p) => p.composant.equals(comp._id));
      return {
        composant: comp._id,
        titre: comp.titre,
        prix: prixEntry ? prixEntry.prix : null,
        prixId: prixEntry ? prixEntry._id : null,
      };
    });

    return response;
  } catch (err) {
    console.error('Error fetching composants:', err);
    return null;
  }
};

module.exports.getPrixComposant = async (composant) => {
  try {
    if (!composant) {
      console.error('Composant is missing');
      return null;
    }
    const composantDt = await composants.findById(composant).select('_id titre');

    if (!composantDt) {
      return null;
    }

    const prix = await prixComposant.find({ composant: composant }).select('_id prix').populate('partenaire', '_id name url');

    const response = {
      _id: composantDt._id,
      title: composantDt.title,
      prices: prix.map((p) => ({
        prix: p.prix,
        prixId: p._id,
        partenaire: {
          _id: p.partenaire._id,
          name: p.partenaire.name,
          url: p.partenaire.url,
        },
      })),
    };

    return response;
  } catch (err) {
    console.error('Error fetching composants:', err);
    return null;
  }
};

module.exports.existsPrixComp = async (composant, partenaire) => {
  try {
    return await prixComposant.exists({ composant: composant, partenaire: partenaire });
  } catch (err) {
    console.error('Error checking if prix composant exists:', err);
    return false;
  }
};

module.exports.existsPrixCompByID = async (id) => {
  try {
    return await prixComposant.exists({ _id: id });
  } catch (err) {
    console.error('Error checking if prix composant exists:', err);
    return false;
  }
};

module.exports.addPrixComp = async (data) => {
  try {
    const newPrixComp = new prixComposant(data);
    await newPrixComp.save();
  } catch (err) {
    console.error('Error adding prix composant:', err);
  }
};

module.exports.updatePrix = async (data) => {
  try {
    await prixComposant.findByIdAndUpdate(data._id, { prix: data.prix, date: new Date() });
  } catch (err) {
    console.error('Error updating prix composant:', err);
  }
};

module.exports.deletePrixComp = async (id) => {
  try {
    await prixComposant.findByIdAndDelete(id);
  } catch (err) {
    console.error('Error deleting prix composant:', err);
  }
};
