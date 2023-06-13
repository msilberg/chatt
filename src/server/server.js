const express = require('express');

const { connectToDatabase } = require('./db_connector');
const router = require('./router');

const DIST_DIR = `${process.env.APP_PATH}/dist`;

const app = express();

app.use(express.static(DIST_DIR));
app.use('*', router);

const port = process.env.APP_PORT;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`${process.env.APP_NAME.toUpperCase()} is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`${process.env.APP_NAME.toUpperCase()} failed to start`, error);
  });
