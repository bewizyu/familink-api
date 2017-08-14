const mongoose = require('mongoose');
const log = require('./logger.helper');
const appHelper = require('./application.helper');

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
};

/**
 * Init the database connection. Bind the
 */
function initDatabaseConnection() {
  if (appHelper.isProd()) {
    options.user = process.env.MONGODB_ADDON_USER;
    options.pass = process.env.MONGODB_ADDON_PASSWORD;
  }

  mongoose.connect(process.env.MONGODB_ADDON_URI, options);

  const db = mongoose.connection;
  db.on('error', (err) => {
    log.error('Database connection error', err);
  });
}

module.exports = {
  initDatabaseConnection,
};
