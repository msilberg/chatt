const express = require('express');

const { getUserInfo, doLogin } = require('./controller');
const { cookie: { name: chattCookieName, ttl: chattCookieTtl } } = require('./settings');

const router = express.Router();

const apiPrefix = '/api/v1';

router.get(`${apiPrefix}/getUserInfo`, async (req, res) => {
  const result = await getUserInfo(req.cookies);
  if (result) {
    res.set('Content-Type', 'application/json');
    res.send(result);
  } else {
    res.sendStatus(204);
  }
});

router.post(`${apiPrefix}/login`, async (req, res) => {
  const result = await doLogin(req.body);
  if (result) {
    const expirationTime = new Date(Date.now() + chattCookieTtl);
    res.cookie(chattCookieName, JSON.stringify(result), {
      httpOnly: true,
      expires: expirationTime,
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(409);
  }
});

router.get(`${apiPrefix}/info`, (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send({ status: 'OK', version: '1.0.0', message: `Welcome to ${process.env.APP_NAME.toString().toUpperCase()}!` });
});

module.exports = router;
