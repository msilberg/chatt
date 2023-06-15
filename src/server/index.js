const express = require('express');
const expressWs = require('express-ws');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { connectToDatabase } = require('./db_connector');
const router = require('./router');
const { setWS } = require('./controller');

const app = express();
const port = process.env.APP_PORT;

app
  .use(express.static('dist'))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .use(router);

expressWs(app);

app.ws('/websocket', ws => {
  console.log('Client connected to Websocket server', new Date());
  setWS(ws);
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`${process.env.APP_NAME.toUpperCase()} is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`${process.env.APP_NAME.toUpperCase()} failed to start`, error);
  });
