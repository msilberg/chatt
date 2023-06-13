const express = require('express');

const router = express.Router();

router.get('/api/v1/getUserInfo', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({ username: 'mikesilberg' });
});

router.get('/api/v1/info', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({ status: 'OK', version: '1.0.0', message: `Welcome to ${process.env.APP_NAME.toString().toUpperCase()}!` });
});

module.exports = router;
