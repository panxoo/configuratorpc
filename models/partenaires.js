const mongoose = require('mongoose');


const partenaireSchema = new mongoose.Schema({
    titre: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: '' },
    specificationsTechniques: { type: String, required: false, default: '' },
    modele: { type: String, required: false, default: '' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    marque: {type: mongoose.Schema.Types.ObjectId, ref: 'Marque', required: true},
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Partenaire', partaneireSchema);
