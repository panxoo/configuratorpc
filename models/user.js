const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: Date, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
