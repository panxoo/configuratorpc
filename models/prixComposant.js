const mongoose = require('mongoose');

const prixComposantSchema = new mongoose.Schema({
  composant: { type: mongoose.Schema.Types.ObjectId, ref: 'Composant', required: true },
  partenaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Partenaire', required: true },
  prix: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PrixComposant', prixComposantSchema);
