const express = require('express');
// const path = require('path');
// const { renderAuthenticationPage } = require('./controller');

const router = express.Router();
// const DIST_DIR = `${process.env.APP_PATH}/dist`;
// const HTML_FILE = path.join(DIST_DIR, 'index.html');

router.get('/api/v1/getUserInfo', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({ username: 'mikesilberg' });
});

router.get('/api/v1/info', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({ status: 'OK', version: '1.0.0', message: `Welcome to ${process.env.APP_NAME.toString().toUpperCase()}!` });
});

module.exports = router;
