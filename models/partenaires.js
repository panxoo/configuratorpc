const mongoose = require('mongoose');

const partenaireSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String },
  commission: { type: Number },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Partenaire', partenaireSchema);
