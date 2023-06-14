const { cookie: { ttl: chattCookieDefaultTtl } } = require('./settings');

const getTtl = (ttlMs = chattCookieDefaultTtl) => new Date(Date.now() + ttlMs);

module.exports = {
  getTtl,
}