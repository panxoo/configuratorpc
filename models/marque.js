const mongoose = require('mongoose');

const marqueSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false, default: '' },
    createdAt: { type: Date, default: Date.now }, 
    isActive: { type: Boolean, default: true },       
});

module.exports = mongoose.model('Marque', marqueSchema);