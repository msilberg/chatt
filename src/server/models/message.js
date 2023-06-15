const mongoose = require('mongoose');

const { channels: { default: defaultChannel } } = require('../settings'); 

const userSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  username: {
    type: String,
    index: true,
    unique: false,
  },
  channel: {
    type: String,
    index: true,
    unique: false,
    default: defaultChannel,
  },
}, { timestamps: true });

const Message = mongoose.model('Message', userSchema);

module.exports = Message;
