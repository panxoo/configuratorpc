const prixComposant = require('../models/prixComposant');
const composants = require('../models/composants');

module.exports.getPrixComposant = async (query) => {
  try {
    const prixList = await prixComposant
      .find({ composant: query })
      .populate({
        path: 'composant',
        select: '_id titre modele marque',
        populate: {
          path: 'marque',
          select: 'name', // Solo traemos el nombre de la marca
        },
      })
      .populate('partenaire', 'name url');

    if (!prixList.length) {
      console.log('No data found');
      return null;
    }

    const composantInfo = prixList[0].composant;

    const prix_composant = prixList.map((item) => ({
      _id: item._id,
      partenaire: item.partenaire,
      prix: item.prix,
      date: item.date,
      __v: item.__v,
    }));

    const response = {
      composant: composantInfo,
      prix_composant,
    };

    return response;
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

    const composantList = await composants.find({ category: category }).select('_id titre modele ').populate('marque', 'name');

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

module.exports.getPrixComposantLowerForCategory = async (category) => {
  try {
    if (!category) {
      console.error('Category is missing');
      return null;
    }

    const composantList = await composants.find({ category: category }).select('_id titre modele').populate('marque', 'name');

    if (!composantList || composantList.length === 0) {
      return null;
    }

    const prixList = await prixComposant.find({
      composant: { $in: composantList.map((c) => c._id) },
    });

    const response = composantList.map((comp) => {
      const prixEntries = prixList.filter((p) => p.composant.equals(comp._id));

      let minPrixEntry = null;
      if (prixEntries.length > 0) {
        minPrixEntry = prixEntries.reduce((min, curr) => (curr.prix < min.prix ? curr : min));
      }
      return {
        composant: comp._id,
        titre: comp.titre,
        modele: comp.modele,
        marque: comp.marque,
        prix: minPrixEntry ? minPrixEntry.prix : null,
        prixId: minPrixEntry ? minPrixEntry._id : null,
      };
    });

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
