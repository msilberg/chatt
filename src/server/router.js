const express = require('express');
const path = require('path');

// const { renderAuthenticationPage } = require('./controller');

const router = express.Router();
const DIST_DIR = `${process.env.APP_PATH}/dist`;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

router.get('/', (req, res) => {
  console.log('HTML_FILE', HTML_FILE);
  res.sendFile(HTML_FILE);
});

router.get('/api/v1', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({ status: 'OK' });
});

router.get('/help', (req, res) => {
  res.send(`Welcome to ${process.env.APP_NAME.toString().toUpperCase()}!`);
});

module.exports = router;
