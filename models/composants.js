const mongoose = require('mongoose');

const composantSchema = new mongoose.Schema({
  titre: { type: String, required: true, unique: true },
  description: { type: String, required: false, default: '' },
  specificationsTechniques: { type: String, required: false, default: '' },
  modele: { type: String, required: false, default: '' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  marque: { type: mongoose.Schema.Types.ObjectId, ref: 'Marque', required: true },
  prix: { type: Number, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Composant', composantSchema);
