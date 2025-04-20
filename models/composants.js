const mongoose = require('mongoose');
const category = require('./category');

const composantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: '' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Composant', composantSchema);