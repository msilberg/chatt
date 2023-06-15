const settings = {
  cookie: {
    name: 'chattSession',
    ttl: 1800000, // half an hour in MS
  },
  channels: {
    default: 'main'
  },
};

module.exports = settings;