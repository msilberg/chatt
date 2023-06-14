const mongoose = require('mongoose');

const { channels: { default: defaultChannel } } = require('../settings'); 

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  channel: {
    type: mongoose.Schema.Types.String,
    default: defaultChannel,
    index: true,
    unique: false,
  },
  expiresAt: { type: Date, expires: 0  },
}, { timestamps: true });

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
