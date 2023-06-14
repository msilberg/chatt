const express = require('express');
const cookieParser = require('cookie-parser')

const { connectToDatabase } = require('./db_connector');
const router = require('./router');

const app = express();
const port = process.env.APP_PORT;

app
  .use(express.static('dist'))
  .use(cookieParser())
  .use(router);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`${process.env.APP_NAME.toUpperCase()} is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`${process.env.APP_NAME.toUpperCase()} failed to start`, error);
  });
