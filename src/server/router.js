const express = require('express');

const { getUserInfo } = require('./controller');

const router = express.Router();

router.get('/api/v1/getUserInfo', async (req, res) => {
  const result = await getUserInfo(req.cookies);
  if (result) {
    res.set('Content-Type', 'application/json');
    res.send(result);
  } else {
    res.sendStatus(204);
  }
});

router.get('/api/v1/info', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({ status: 'OK', version: '1.0.0', message: `Welcome to ${process.env.APP_NAME.toString().toUpperCase()}!` });
});

module.exports = router;
