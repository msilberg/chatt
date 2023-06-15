const express = require('express');

const { getChattInfo, doLogin, uploadMessage } = require('./controller');
const { cookie: { name: chattCookieName, ttl: chattCookieTtl } } = require('./settings');
const { getTtl } = require('./utils');

const router = express.Router();

const apiPrefix = '/api/v1';

router.get(`${apiPrefix}/getChattInfo`, async (req, res) => {
  const result = await getChattInfo(req.cookies);
  if (result) {
    res.cookie(chattCookieName, JSON.stringify(result.user), {
      httpOnly: true,
      expires: getTtl(),
    }); // renew cookie
    res.set('Content-Type', 'application/json');
    res.send(result);
  } else {
    res.cookie(chattCookieName, '', { expires: new Date(0) }); // deleting cookie upon session expiration
    res.sendStatus(204);
  }
});

router.post(`${apiPrefix}/login`, async (req, res) => {
  const result = await doLogin(req.body);
  if (result) {
    res.cookie(chattCookieName, JSON.stringify(result), {
      httpOnly: true,
      expires: getTtl(),
    }); // create cookie
    res.sendStatus(201);
  } else {
    res.sendStatus(409);
  }
});

router.post(`${apiPrefix}/uploadMessage`, async (req, res) => {
  const result = await uploadMessage(req.cookies, req.body);
  if (result) {
    res.cookie(chattCookieName, JSON.stringify(result), {
      httpOnly: true,
      expires: getTtl(),
    }); // renew cookie
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
