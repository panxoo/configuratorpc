const mongoose = require('mongoose');

const userConfigSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  composants: [
    {
      composant: { type: mongoose.Schema.Types.ObjectId, ref: 'Composant', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserConfig', userConfigSchema);
