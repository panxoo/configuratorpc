const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  userAuth: { type: mongoose.Schema.Types.ObjectId, ref: 'userAuth', required: true, unique: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
