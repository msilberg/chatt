const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
