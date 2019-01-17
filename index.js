const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('config');

const log = require('./src/helpers/logger.helper');
const dbHelper = require('./src/helpers/db.helper');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 8080;

// don't show log in test environment
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database initalize connection
dbHelper.initDatabaseConnection();

/**
 * CORS configurations
 */
app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method === 'OPTIONS') {
    res.status(200)
      .end();
  } else {
    next();
  }
});

/**
 * Hello world
 */
app.use('/', require('./src/routes/api.routes'));

/**
 * Undefined routes return 404 http code
 */
app.use((req, res) => {
  res.status(404).send({
    message: 'URL not found',
  });
});

app.listen(PORT, () => {
  log.info(`Running on port: ${PORT}`);
});

module.exports = app;
