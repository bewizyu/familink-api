const mongoose = require('mongoose');
const log = require('./logger.helper');
const appHelper = require('./application.helper');

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
};

let db;

/**
 * Init the database connection and log events
 */
function initDatabaseConnection() {
  if (appHelper.isProd()) {
    options.user = process.env.MONGODB_ADDON_USER;
    options.pass = process.env.MONGODB_ADDON_PASSWORD;
  }

  mongoose.connect(process.env.MONGODB_ADDON_URI, options);

  // Use native promises
  mongoose.Promise = global.Promise;

  db = mongoose.connection;
  db.on('error', (err) => {
    log.error('Database connection error', err);
  });

  db.once('open', () => {
    log.info('Connection with database succeeded.');
  });
}

function getDB() {
  if (!db) {
    throw new Error('DB not initialized');
  }
  return db;
}

module.exports = {
  initDatabaseConnection,
  getDB,
};
